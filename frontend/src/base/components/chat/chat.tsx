import React, { Fragment, useEffect, useState } from 'react';
import $ from 'jquery';
import './chat.css';
import { EnumCharcasetypes, Input } from '../form/form';
import { useChatContext } from '../../hooks/useChatContext';
import { ChatAttachment, ChatChannels, ChatConversation } from './types';
import Channels from './channels';
import Spinners from '../spinners/spinners';
import ContentMessages from './contentmessages';
import { ISendMessages } from './sendmessages';
import { IOptionsHeadMessage } from './headmessages';

interface IContentMessages {
   id: string,
   contentMessage: JSX.Element
}

export interface ChatViewProps {
   fhoto?: string,
   user: string,
   name: string,
   showAvatarChannels?: boolean,
   showChannels?: boolean,
   optionsHeadMessage?: (channel: ChatChannels<any, any>) => Array<IOptionsHeadMessage>,
   loadConversation?: (data: any) => Promise<Array<ChatConversation<any>>>,
   loadAttachment?: (conversation: ChatConversation<any>) => Promise<ChatAttachment>,
   sendMessages: (channel: ChatChannels<any, any>, message: string) => Promise<ISendMessages>,
   contentCloseChat?: (channel: ChatChannels<any, any>, actionClose: () => void, conversation?: ChatConversation<any>) => JSX.Element
}

const ChatView: React.FC<ChatViewProps> = (props) => {

   const { chatState, chatDispatch, channelActive } = useChatContext();
   const { fhoto, user, name, showAvatarChannels, loadConversation, sendMessages, optionsHeadMessage, contentCloseChat, showChannels, loadAttachment } = props;
   const [filter, setFilter] = useState<string>('');
   const [loadingChannels, setLoadingChannels] = useState<boolean>(false);
   const [contentMessages, setContentMessages] = useState<Array<IContentMessages>>([]);

   useEffect(() => {
      /*---------------------------------------------------------------------
      chatuser
      -----------------------------------------------------------------------*/
      $(document).ready(function () {
         $('.chat-head .chat-user-profile').click(function () {
            $(this).parent().next().toggleClass('show');
         });
         $('.user-profile .close-popup').click(function () {
            $(this).parent().parent().removeClass('show');
         });
      });

      /*---------------------------------------------------------------------
      chatuser main
      -----------------------------------------------------------------------*/
      $(document).ready(function () {
         $('.chat-search .chat-profile').click(function () {
            $(this).parent().next().toggleClass('show');
         });
         $('.user-profile .close-popup').click(function () {
            $(this).parent().parent().removeClass('show');
         });
      });

      /*---------------------------------------------------------------------
      Chat start
      -----------------------------------------------------------------------*/
      $(document).ready(function () {
         $('#chat-start').click(function () {
            $('.chat-data-left').addClass('show');
         });
         $('.close-btn-res').click(function () {
            $('.chat-data-left').removeClass('show');
         });
         $('.iq-chat-ui li').click(function () {
            $('.chat-data-left').removeClass('show');
         });
         $('.sidebar-toggle').click(function () {
            $('.chat-data-left').addClass('show');
         });
      });

   }, [])

   useEffect(() => {
      let _contentMessages = [...contentMessages]

      chatState.channels?.forEach(channel => {
         let contMess = _contentMessages.find(cm => {
            return cm.id === channel.id;
         })

         if (!contMess) {
            _contentMessages.push({
               id: channel.id,
               contentMessage: <ContentMessages
                  id={channel.id}
                  channel={channel}
                  loadConversation={loadConversation}
                  loadAttachment={loadAttachment}
                  sendMessages={sendMessages}
                  optionsHeadMessage={optionsHeadMessage}
                  contentCloseChat={contentCloseChat}

               // photoRight=''
               />
            })
         }
      });

      if (_contentMessages.length !== contentMessages.length)
         setContentMessages(_contentMessages);

   }, [chatState.channels])

   const checkTags = (name: string, expression: string): boolean => {
      let isFound: boolean = false;
      let expressions = expression.split(' ');
      let names = name.split(' ');

      expressions.forEach(e => {

         names.forEach(n => {
            if (n.trim().toUpperCase().search(e.toUpperCase()) >= 0)  //   .indexOf(e.toUpperCase()) !== -1)
               //  startsWith(filter.toUpperCase()))
               isFound = true;
         })

      })

      return isFound;
   }

   const renderChannels = (): JSX.Element => {

      if (loadingChannels)
         return <Spinners loading size={70} />

      let _filter: string = filter ? filter.trim() : '';

      let channels: Array<JSX.Element> = [];

      chatState.channels?.forEach(channel => {

         if (_filter.trim().length === 0 || checkTags(String(channel.tags!), _filter)) {
            channels.push(
               <Channels
                  channel={channel}
                  showAvatar={showAvatarChannels}
               />
            );
         }
      })

      return <Fragment>{channels}</Fragment>;
   }

   const renderContentMessages = (): Array<JSX.Element> => {
      let elContentMessages: Array<JSX.Element> = [];
      contentMessages.forEach(cm => {
         elContentMessages.push(cm.contentMessage)
      });

      return elContentMessages;
   }

   return (
      <div className="row">
         <div className="col-sm-12">
            <div className="iq-card mb-0 mr-3">
               <div className="iq-card-body chat-page p-0">
                  <div className="chat-data-block">
                     <div className="row">
                        {showChannels &&
                           <div className="col-lg-3 chat-data-left scroller">
                              <div className="chat-search pl-3">
                                 <div className="d-flex align-items-center">
                                    <div className="chat-profile mr-3 mt-3">
                                       {fhoto ?
                                          <img
                                             src={`data:image/png;base64,${fhoto}`}
                                             className="avatar-60"
                                             alt="chat-user"
                                          />
                                          :
                                          <i className="mdi mdi-account-circle m-0 p-0" style={{ fontSize: 40, lineHeight: 0, position: 'relative', top: '10px' }}></i>
                                       }
                                    </div>
                                    <div className="chat-caption mt-3">
                                       <h5 className="mb-0">{user}</h5>
                                       <p className="m-0">{name}</p>
                                    </div>
                                    <button type="submit" className="close-btn-res p-3"><i className="ri-close-fill"></i></button>
                                 </div>
                                 <div className="chat-searchbar mt-4">
                                    <div className="form-group chat-search-data m-0">
                                       <Input
                                          className="form-control round"
                                          placeholder='Pesquisar'
                                          id="chat-search"
                                          charCase={EnumCharcasetypes.UPPERCASE}
                                          value={filter}
                                          onChange={e => {
                                             setFilter(e.target.value);
                                          }}
                                       />
                                       <i className="ri-search-line"></i>
                                    </div>
                                 </div>
                              </div>
                              <div className="chat-sidebar-channel scroller mt-3 pl-3">
                                 <ul className="iq-chat-ui nav flex-column nav-pills">
                                    {renderChannels()}
                                 </ul>
                              </div>
                           </div>
                        }

                        <div className={`col-lg-${showChannels ? '9' : '12'} chat-data p-0 chat-data-right`}>
                           <div className="tab-content">
                              <div className={`tab-pane fade ${channelActive() === undefined ? 'active show' : ''} `} id="default-block" role="tabpanel">
                                 <div className="chat-start">
                                    <span className="iq-start-icon text-primary"><i className="ri-message-3-line"></i></span>
                                    <button id="chat-start" className="btn bg-white mt-3">
                                       Iniciar Conversa!
                                    </button>
                                 </div>
                              </div>
                              {renderContentMessages()}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div >
   )
}

ChatView.defaultProps = {
   showChannels: true
}

export default ChatView;
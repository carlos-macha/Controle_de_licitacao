import React, { Fragment } from 'react';
import { useChatContext } from '../../hooks/useChatContext';
import EmojiPicker, { Categories, EmojiClickData } from 'emoji-picker-react';
import Button from '../form/form';
import { ChatChannels, ChatConversation } from './types';

export interface ISendMessages {
   dataChannel?: any,
   conversation: ChatConversation<any>
}

interface SendMessagesProps {
   channel: ChatChannels<any, any>,
   sendMessages: (channel: ChatChannels<any, any>, message: string) => Promise<ISendMessages>
}

const SendMessages: React.FC<SendMessagesProps> = (props) => {
   const { sendMessages, channel } = props;
   const { chatDispatch } = useChatContext();
   const idInput = `input-message-${channel.id}`;
   const idInputEmoji = `chatinputemojicollapse-${channel.id}`;
   const idEmojiBtn = `idEmojiBtn-${channel.id}`;

   const onSendMessage = () => {
      var elChatInputMessage: HTMLElement | null | undefined = document.getElementById(idInput);
      if (elChatInputMessage !== null && elChatInputMessage !== undefined) {
         if (elChatInputMessage.innerText.trim().length > 0) {

            sendMessages(channel, (elChatInputMessage as HTMLInputElement).innerText).then(data => {

               if (data.dataChannel) {
                  chatDispatch({
                     type: 'channel',
                     data: data.dataChannel,
                     idChannel: channel.id
                  });
               }

               chatDispatch({
                  type: 'conversation',
                  conversation: data.conversation
               });

               (elChatInputMessage as HTMLInputElement).innerText = '';
               var elContainnerEmoji: HTMLElement | null | undefined = document.getElementById(idInputEmoji)
               if (elContainnerEmoji !== null && elChatInputMessage !== undefined) {
                  if (elContainnerEmoji.classList.contains('show')) {
                     document.getElementById(idEmojiBtn)?.click();
                  }
               }
            });

         }
      }
   }

   return (
      <Fragment>
         <div
            className="collapse"
            id={idInputEmoji}
            style={{
               border: 'none',
               paddingLeft: '5px',
               position: 'absolute',
               bottom: 82
            }}
         >
            <EmojiPicker
               searchPlaceHolder='Pesquisar'
               previewConfig={{
                  showPreview: false
               }}
               categories={[
                  {
                     category: Categories.SUGGESTED,
                     name: 'Recentes'
                  },
                  {
                     category: Categories.SMILEYS_PEOPLE,
                     name: 'Sorrisos e Emoções'
                  },
                  {
                     category: Categories.ANIMALS_NATURE,
                     name: 'Animais e Natureza'
                  },
                  {
                     category: Categories.FOOD_DRINK,
                     name: 'Comida e Bebida'
                  },
                  {
                     category: Categories.TRAVEL_PLACES,
                     name: 'Viagem'
                  },
                  {
                     category: Categories.ACTIVITIES,
                     name: 'Atividades'
                  },
                  {
                     category: Categories.OBJECTS,
                     name: 'Objetos'
                  },
                  {
                     category: Categories.SYMBOLS,
                     name: 'Símbolos'
                  },
                  {
                     category: Categories.FLAGS,
                     name: 'Bandeiras'
                  }
               ]}
               onEmojiClick={(emoji: EmojiClickData, event: MouseEvent) => {
                  var elChatInputMessage: HTMLElement = document.getElementById(idInput)!;
                  if (elChatInputMessage !== null && elChatInputMessage !== undefined) {
                     const placeholder = elChatInputMessage.getAttribute('data-placeholder');

                     if (placeholder === (elChatInputMessage as HTMLInputElement).innerHTML)
                        (elChatInputMessage as HTMLInputElement).innerHTML = '';

                     (elChatInputMessage as HTMLInputElement).innerHTML = (elChatInputMessage as HTMLInputElement).innerHTML + emoji.emoji
                  }
               }}
            />
         </div>
         <div className="chat-footer p-3 bg-white">
            <form className="d-flex align-items-center" action="/#">
               <div className="chat-attagement d-flex">
                  <a
                     id={idEmojiBtn}
                     style={{
                        cursor: 'pointer'
                     }}
                     aria-expanded="false"
                     aria-controls={idInputEmoji}
                     data-toggle="collapse"
                     data-target={`#${idInputEmoji}`}

                  ><i className="fa fa-smile-o pr-3" aria-hidden="true"></i></a>
                  {/* <Button
                  id="emoji-btn"
                  className="btn btn-link text-decoration-none btn-lg waves-effect emoji-btn"
                  classIcon='fa fa-smile-o pr-3 align-middle'
                  aria-expanded="false"
                  aria-controls="chatinputemojicollapse"
                  data-toggle="collapse"
                  data-target="#chatinputemojicollapse"
                  title="Emoji"
                  overlayProps={{
                     placement: "top"
                  }}
               /> */}
                  {/* <a href="/#"><i className="fa fa-paperclip pr-3" aria-hidden="true"></i></a> */}
               </div>
               <div
                  role='textbox'
                  spellCheck
                  data-placeholder="Digite sua mensagem..."
                  id={idInput}
                  contentEditable="true"
                  className="input-chat mr-3"
                  style={{
                     maxHeight: '7.35em',
                     userSelect: 'text',
                     whiteSpace: 'pre-wrap',
                     wordBreak: 'break-word',
                     overflowX: 'hidden'
                  }}
                  onKeyDown={e => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                        if (e.preventDefault) {
                           e.preventDefault();
                        }

                        onSendMessage();
                     }
                  }}
                  onFocus={e => {
                     const el = document.getElementById(idInput);
                     if (el !== null) {
                        const placeholder = el.getAttribute('data-placeholder');
                        const value = e.target.innerHTML;
                        value === placeholder && (e.target.innerHTML = '');
                     }
                  }}
                  onBlur={e => {
                     const el = document.getElementById(idInput);
                     if (el !== null) {
                        const placeholder = el.getAttribute('data-placeholder');
                        const value = e.target.innerHTML;
                        (value === '' || value === '<br>') && (e.target.innerHTML = placeholder!);
                     }
                  }}
                  onPaste={e => {
                     if (e.clipboardData.types.indexOf('text/plain') >= 0) {
                        if (e.preventDefault) {
                           e.preventDefault();
                           e.stopPropagation();
                        }

                        let item = e.clipboardData.items[e.clipboardData.types.indexOf('text/plain')];
                        item.getAsString(data => {

                           var elChatInputMessage: HTMLElement = document.getElementById(idInput)!;
                           if (elChatInputMessage !== null && elChatInputMessage !== undefined) {
                              const placeholder = elChatInputMessage.getAttribute('data-placeholder');

                              if (placeholder === (elChatInputMessage as HTMLInputElement).innerHTML)
                                 (elChatInputMessage as HTMLInputElement).innerHTML = '';

                              (elChatInputMessage as HTMLInputElement).innerHTML = (elChatInputMessage as HTMLInputElement).innerHTML + data
                           }

                        });
                     }
                  }}
               />
               <Button
                  className='btn btn-primary d-flex align-items-center p-2'
                  classIcon='fa fa-paper-plane-o'
                  onClick={onSendMessage}
               >
                  <span className="d-none d-lg-block ml-1">Enviar</span>
               </Button>
            </form>

         </div>
      </Fragment>
   );
}

export default SendMessages;
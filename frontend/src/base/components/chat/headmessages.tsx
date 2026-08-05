import React from 'react';
import { useChatContext } from '../../hooks/useChatContext';
import { ChatMessage } from './types';
import { useSweetAlertContext } from '../../hooks/useSweetAlertContext';

export interface IOptionsHeadMessage {
   iconCss: string,
   title?: string,
   description?: string,
   onClick?: () => void
}

interface HeadMessagesProps {
   message: ChatMessage<any>,
   caption: string,
   channelId: string,
   photo?: string,
   options?: Array<IOptionsHeadMessage>
}

const HeadMessages: React.FC<HeadMessagesProps> = (props) => {
   const { message, channelId, caption, photo, options } = props;
   const { chatDispatch } = useChatContext();
   const { sweetAlertdispatch } = useSweetAlertContext();
   // let icon: string = iconChat(message.tipoDocOrigem);

   var elOptions: Array<JSX.Element> = [];
   if (options) {
      options.forEach((opt, idx) => {
         elOptions.push(
            <a
               key={`opt-head-message-${idx}`}
               className="chat-icon-delete" style={{ cursor: 'pointer' }}
               onClick={opt.onClick}
            >
               <i className={opt.iconCss}></i>
            </a>
            // <a
            //    key={`opt-navbar-${idx}`}
            //    href="javascript:void();"
            //    className="iq-sub-card iq-bg-primary-hover"
            //    onClick={opt.onClick}
            // >
            //    <div className="media align-items-center">
            //       <div className="rounded iq-card-icon iq-bg-primary">
            //          <i className={opt.iconCss}></i>
            //       </div>
            //       <div className="media-body ml-3">
            //          <h6 className="mb-0 ">{opt.title}</h6>
            //          <p className="mb-0 font-size-12">{opt.description}</p>
            //       </div>
            //    </div>
            // </a>
         )
      })
   }


   return (
      <div className="chat-head">
         <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
            <div className="d-flex align-items-center" style={{ height: '50px' }}>
               <div id="sidebar-toggle" className="sidebar-toggle">
                  <i className="ri-menu-3-line"></i>
               </div>
               {photo &&
                  <div className="avatar chat-user-profile m-0 mr-3">
                     <img src={`data:image/png;base64,${photo}`} alt="avatar" className="avatar-50 " />
                     {/* <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success"></i></span> */}
                  </div>
               }
               {/* <i className={`mdi ${icon}`} style={{ fontSize: 50 }} /> */}
               <h5 className="mb-0 ml-2">{caption}</h5>
            </div>
            {/* <div id="chat-user-detail-popup" className="scroller">
               <div className="user-profile text-center">
                  <button type="submit" className="close-popup p-3"><i className="ri-close-fill"></i></button>
                  <div className="user mb-4">
                     <a className="avatar m-0">
                        <img src="images/user/05.jpg" alt="avatar" />
                     </a>
                     <div className="user-name mt-4"><h4>Nik Jordan</h4></div>
                     <div className="user-desc"><p>Cape Town, RSA</p></div>
                  </div>
                  <hr />
                  <div className="chatuser-detail text-left mt-4">
                     <div className="row">
                        <div className="col-6 col-md-6 title">Nik Name:</div>
                        <div className="col-6 col-md-6 text-right">Nik</div>
                     </div><hr />
                     <div className="row">
                        <div className="col-6 col-md-6 title">Tel:</div>
                        <div className="col-6 col-md-6 text-right">072 143 9920</div>
                     </div><hr />
                     <div className="row">
                        <div className="col-6 col-md-6 title">Date Of Birth:</div>
                        <div className="col-6 col-md-6 text-right">July 12, 1989</div>
                     </div><hr />
                     <div className="row">
                        <div className="col-6 col-md-6 title">Gender:</div>
                        <div className="col-6 col-md-6 text-right">Male</div>
                     </div><hr />
                     <div className="row">
                        <div className="col-6 col-md-6 title">Language:</div>
                        <div className="col-6 col-md-6 text-right">Engliah</div>
                     </div>
                  </div>
               </div>
            </div> */}
            <div className="chat-header-icons d-flex">
               {elOptions}
               {/* <a href="#" className="chat-icon-phone">
                  <i className="ri-phone-line"></i>
               </a>
               <a href="#" className="chat-icon-video">
                  <i className="ri-vidicon-line"></i>
               </a> */}
               {/* <a className="chat-icon-delete"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                     sweetAlertdispatch({
                        type: 'show',
                        props: {
                           warning: true,
                           showCancel: true,
                           confirmBtnText: "Sim, confirmo!",
                           cancelBtnText: "Cancelar!",
                           confirmBtnBsStyle: "danger",
                           title: "Confirma remover este chat?",
                           onConfirm: () => {
                              chatDispatch({
                                 type: 'close',
                                 idChannel: channelId
                              });
                              sweetAlertdispatch({
                                 type: 'close'
                              })
                           },
                           onCancel: () => {
                              sweetAlertdispatch({
                                 type: 'close'
                              })
                           },
                           focusCancelBtn: true,
                           show: true
                        },
                        msg: 'Caso sim, será possível retomar a conversa novamente!'
                     })
                  }}
               >
                  <i className="ri-delete-bin-line"></i>
               </a> */}
               {/* <span className="dropdown">
                  <i className="ri-more-2-line cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer pr-0" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu"></i>
                  <span className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                     <a className="dropdown-item" href="/#"><i className="fa fa-thumb-tack" aria-hidden="true"></i> Pin to top</a>
                     <a className="dropdown-item" href="/#"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete chat</a>
                     <a className="dropdown-item" href="/#"><i className="fa fa-ban" aria-hidden="true"></i> Block</a>
                  </span>
               </span> */}
            </div>
         </header>
      </div>
   );
}

export default HeadMessages;
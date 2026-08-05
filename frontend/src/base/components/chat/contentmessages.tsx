import React, { useEffect, useState } from 'react';
import { Moment } from 'moment';
import 'moment/locale/pt-br';
import { useSweetAlertContext } from '../../hooks/useSweetAlertContext';
import { ChatAttachment, ChatChannels, ChatConversation } from './types';
import { useChatContext } from '../../hooks/useChatContext';
import { momentUtils } from '../../utils/momentutils';
import { utilities } from '../../utils/utilities';
import Spinners from '../spinners/spinners';
import HeadMessages, { IOptionsHeadMessage } from './headmessages';
import SendMessages, { ISendMessages } from './sendmessages';

interface ContentMessagesProps {
   id: string,
   channel: ChatChannels<any, any>,
   photoRight?: string,
   photoLeft?: string,
   optionsHeadMessage?: (channel: ChatChannels<any, any>) => Array<IOptionsHeadMessage>,
   loadConversation?: (data: any) => Promise<Array<ChatConversation<any>>>,
   loadAttachment?: (conversation: ChatConversation<any>) => Promise<ChatAttachment>,
   sendMessages: (channel: ChatChannels<any, any>, message: string) => Promise<ISendMessages>,
   contentCloseChat?: (channel: ChatChannels<any, any>, actionClose: () => void, conversation?: ChatConversation<any>) => JSX.Element
}

const ContentMessages: React.FC<ContentMessagesProps> = (props) => {
   const { id, photoRight, photoLeft, channel, loadConversation, sendMessages, optionsHeadMessage, contentCloseChat, loadAttachment } = props;
   const { showSweetAlertMessage } = useSweetAlertContext();
   const [loading, setLoading] = useState<boolean>(false);
   const { chatState, channelActive, close } = useChatContext();
   const [showCloseChat, setShowCloseChat] = useState<boolean>(false);
   const [lastConversartion, setLastConversation] = useState<ChatConversation<any> | undefined>();

   const loadConversations = async (data: any) => {
      if (loadConversation) {
         setLoading(true);
         loadConversation(data).then(conversations => {
            conversations.forEach(c => {
               updateListChat(c);
            })
         }).catch(error => {
            showSweetAlertMessage('error', 'Atenção!', 'Não foi possível carregar as mensagens!');
            console.log(error);
         }).finally(() => {
            setLoading(false);
            updateScroll();
         })
      }
   }

   const updateScroll = () => {
      var element: HTMLElement = document.getElementById(`${id}-scroller`)!;
      element.scrollTop = element.scrollHeight;
   }

   const removerUltimaTagBR = (texto: string): string => {
      var ultimaTagBR = texto.lastIndexOf('<br>');
      if (ultimaTagBR !== -1) {
         texto = texto.substring(0, ultimaTagBR) + texto.substring(ultimaTagBR + 4);
      }

      return texto;
   }

   const resolveAttachment = (element: HTMLParagraphElement, conversation: ChatConversation<any>) => {
      if (!conversation.attachment)
         return;

      let iconName: string = '';
      let base64: string = conversation.attachment.base64;

      switch (conversation.attachment.extension) {
         case 'JPG': iconName = 'image';
            break;

         case 'WEBP': iconName = 'image';
            break;

         case 'PNG': iconName = 'image';
            break;

         case 'GIF': iconName = 'image';
            break;

         case 'BMP': iconName = 'image';
            break;

         case 'JPEG': iconName = 'image';
            break;

         case 'PDF': iconName = 'file-pdf-box';
            break;

         case 'XLS': iconName = 'file-excel';
            break;

         case 'CSV': iconName = 'file-excel';
            break;

         case 'XLSX': iconName = 'file-excel';
            break;

         case 'DOC': iconName = 'file-word';
            break;

         case 'DOCX': iconName = 'file-word';
            break;

         case 'PPT': iconName = 'file-powerpoint';
            break;

         case 'PPTX': iconName = 'file-powerpoint';
            break;

         case 'TXT': iconName = 'file-document-outline';
            break;

         default: iconName = 'file-question';
            break;
      }

      var btn = document.createElement("button");
      let isImage: boolean = iconName === 'image';
      let linkDownload = document.createElement("a");
      linkDownload.id = `btnDownloadFile-${conversation.attachment?.id}`;
      linkDownload.style.display = 'none';
      linkDownload.download = conversation.attachment?.fileName;
      btn.appendChild(linkDownload);

      if (isImage) {
         btn.className = 'm-0 p-0';
         btn.style.border = '0';
         btn.onclick = () => {
            if (loadAttachment)
               loadAttachment(conversation);
         }
         var elImg = document.createElement('img');
         elImg.src = `data:image/png;base64,${base64}`;
         elImg.width = 300;
         elImg.style.borderRadius = '0';
         elImg.className = 'img-fluid';
         elImg.alt = conversation.attachment.fileName;
         btn.appendChild(elImg);
      } else {
         if (conversation.type === 'right') {
            btn.className = 'btn btn-primary';
         } else {
            btn.className = 'btn btn-outline-primary';
         }
         btn.onclick = () => {
            const elLinkDown = document.getElementById(`btnDownloadFile-${conversation.attachment?.id}`) as HTMLAnchorElement;
            if (elLinkDown && elLinkDown.href.trim() !== '') {
               elLinkDown.click();
               return;
            }

            if (loadAttachment) {

               const elIcon = document.getElementById(`iconDownloadFile-${conversation.attachment?.id}`);
               if (elIcon)
                  elIcon.style.display = 'none';

               const elGif = document.getElementById(`imgloadingFile-${conversation.attachment?.id}`);
               if (elGif)
                  elGif.style.display = '';

               loadAttachment(conversation).then(data => {
                  if (elLinkDown && elLinkDown.href.trim() === '') {
                     elLinkDown.href = `data:application/octet-stream;base64,${data.base64}`;
                     elLinkDown.click();
                  }
               }).finally(() => {
                  if (elIcon)
                     elIcon.style.display = '';

                  if (elGif)
                     elGif.style.display = 'none';
               });
            }
         }

         var elIcon = document.createElement('i');
         elIcon.className = `mdi mdi-${iconName}`;
         btn.appendChild(elIcon);

         var elSpan = document.createElement('span');
         elSpan.className = 'mr-1';
         elSpan.appendChild(document.createTextNode(conversation.attachment.fileName));
         btn.appendChild(elSpan);

         var elIconDownload = document.createElement('i');
         elIconDownload.className = 'mdi mdi-download';
         elIconDownload.id = `iconDownloadFile-${conversation.attachment.id}`
         btn.appendChild(elIconDownload);

         var elImgLoading = document.createElement('img');
         elImgLoading.src = `${utilities.baseURL()}images/tenor.gif`;
         elImgLoading.style.display = 'none';
         elImgLoading.id = `imgloadingFile-${conversation.attachment.id}`
         elImgLoading.width = 15;
         elImgLoading.className = 'mr-1';
         btn.appendChild(elImgLoading);
      }
      element.appendChild(btn);

      // if (isImage) {
      //    iconName = iconName.trim.length > 0 ? iconName : `-${iconName}`;

      //    html =
      //       <Fragment>
      //          <button title={`Visualizar ${conversation.attachment.fileName}`}
      //             className='m-0 p-0'
      //             style={{ border: 0 }}
      //             onClick={() => {
      //                // this.carregarAnexo(conversa, isImage);
      //             }}

      //          >
      //             <img src={`data:image/png;base64,${base64}`} alt={conversation.attachment.fileName} width="300" />
      //          </button>
      //       </Fragment >
      // } else {

   }

   const resolveMessage = (element: HTMLParagraphElement, conversation: ChatConversation<any>, message: string): boolean => {
      if (message.search('<JOIN-CHAT>') >= 0)
         return false;

      if (message.search('<CLOSE-CHAT>') >= 0) {
         setShowCloseChat(true);
         setLastConversation(conversation);
         return false;
      }

      if (message.search('<ATTACHMENT-CHAT>') >= 0) {
         resolveAttachment(element, conversation);
         return true;
      }

      message.split('<br>').forEach((texto, index) => {
         element.appendChild(document.createTextNode(texto));
         if (index < message.length) {
            element.appendChild(document.createElement("br"))
         }
      });
      return true;
   }

   const updateListChat = (conversation: ChatConversation<any>) => {
      let textoMsg = utilities.base64Decode(conversation.message);
      textoMsg = textoMsg.replace(/(\r\n|\n|\r)/gm, "<br>").trim()!; /*remoção de quebra de linha na mensagem*/;
      textoMsg = removerUltimaTagBR(textoMsg);

      var pMessage = document.createElement("p");

      if (!resolveMessage(pMessage, conversation, textoMsg))
         return;

      var el = document.getElementById(`${id}-content`);
      if (el) {
         let dataMoment: Moment = momentUtils.fromOADateTime(conversation.dateTime);
         let dataFormatada: string = dataMoment.format('HH:mm');


         var divChat = document.createElement("div");
         divChat.className = 'chat';

         var divChatUser = document.createElement("div");
         divChatUser.className = 'chat-user';

         var divChatDetail = document.createElement("div");
         divChatDetail.className = 'chat-detail';

         var divChatMessage = document.createElement("div");
         divChatMessage.className = 'chat-message';

         var spanTime = document.createElement('span');
         spanTime.className = 'chat-time mt-1';
         spanTime.appendChild(document.createTextNode(dataFormatada));

         divChatMessage.appendChild(pMessage);
         divChatDetail.appendChild(divChatMessage);
         divChat.appendChild(divChatUser);
         divChat.appendChild(divChatDetail);
         el.appendChild(divChat);

         var aAvatar = document.createElement('a');
         aAvatar.className = 'avatar m-0';
         divChatUser.appendChild(aAvatar)

         let photo: string | undefined;

         if (conversation.type === 'right') {
            if (photoRight) {
               photo = photoRight;
            }
         } else {
            if (photoLeft)
               photo = photoLeft;

            divChat.className = 'chat chat-left';
         }

         if (photo) {
            var imgFoto = document.createElement('img');
            imgFoto.src = `data:image/png;base64,${photo}`;
            imgFoto.className = 'avatar-35';
            imgFoto.alt = 'avatar';
            imgFoto.style.objectFit = 'cover';
            imgFoto.style.objectPosition = 'center';
            aAvatar.appendChild(imgFoto);
         } else {
            var elIcon = document.createElement('i');
            elIcon.className = `mdi mdi-account-circle m-0 p-0`;
            elIcon.style.fontSize = '40px';
            elIcon.style.lineHeight = '0';
            elIcon.style.position = 'relative';
            elIcon.style.top = '10px';
            aAvatar.appendChild(elIcon);
         }

         divChatUser.appendChild(spanTime);

         updateScroll();
      }
   }

   const hasMessages = (): boolean => {
      var el = document.getElementById(`${id}-content`);
      return el?.getElementsByTagName('div').length! > 0;
   }

   const actionClose = () => {
      close(channel.id);
   }

   useEffect(() => {
      if (chatState.type === 'open') {
         let _channelActive = channelActive();
         if (_channelActive?.id === id) {
            if (!hasMessages()) {
               loadConversations(_channelActive.lastMessage?.data);
            }
         }
      }
   }, [chatState.channels])

   useEffect(() => {
      console.log(chatState.conversation)
      console.log(channel)
      if (chatState.conversation) {
         if (chatState.conversation.key === channel.key) {
            console.log('teste')
            if (!hasMessages()) {
               loadConversations(channel.lastMessage?.data);
               return;
            }
            console.log('update')
            updateListChat(chatState.conversation);
         }
      }

   }, [chatState.conversation])

   return (
      <div className={`tab-pane fade ${channelActive()?.id === id ? 'active show' : ''} `} id={`${id}`} role="tabpanel">
         <HeadMessages
            message={channel.lastMessage!}
            channelId={id}
            caption={channel.caption}
            options={optionsHeadMessage && optionsHeadMessage(channel)}
         />
         <div className='chat-loadind' style={{ display: loading ? 'flex' : 'none' }}>
            <Spinners loading={loading} size={70} />
         </div>
         <div className="chat-content scroller" id={`${id}-scroller`} style={{ display: loading ? 'none' : 'block' }}>
            <div id={`${id}-content`}></div>
            {
               showCloseChat && contentCloseChat && contentCloseChat(channel, actionClose, lastConversartion)
            }
         </div>
         <SendMessages
            channel={channel}
            sendMessages={sendMessages}
         />
      </div>
   );
}

export default ContentMessages;
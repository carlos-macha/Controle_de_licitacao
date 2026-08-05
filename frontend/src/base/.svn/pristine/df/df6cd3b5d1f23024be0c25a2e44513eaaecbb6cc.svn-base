import HTMLReactParser from 'html-react-parser';
import React from 'react';
import { Moment } from 'moment';
import { ChatChannels } from './types';
import { useMenuContext } from '../../menu/hooks/useMenuContext';
import { useChatContext } from '../../hooks/useChatContext';
import { momentUtils } from '../../utils/momentutils';

interface ChannelsProps {
   channel: ChatChannels<any, any>,
   showAvatar?: boolean
}

const Channels: React.FC<ChannelsProps> = (props) => {
   const { channel, showAvatar } = props;
   const { dispatch } = useMenuContext();
   const { open } = useChatContext();

   // let msgTexto: Array<string> = channel.lastMessage?.message.split('<br>')!;
   // let icon: string = iconChat(channel.lastMessage?.tipoDocOrigem!);

   let msgTexto = channel.lastMessage?.message!;
   msgTexto = msgTexto.replace(/(\r\n|\n|\r)/gm, "<br>").trim()!; /*remoção de quebra de linha na mensagem*/;
   msgTexto = removerUltimaTagBR(msgTexto);

   function removerUltimaTagBR(texto: string) {
      var ultimaTagBR = texto.lastIndexOf('<br>');
      if (ultimaTagBR !== -1) {
         texto = texto.substring(0, ultimaTagBR) + texto.substring(ultimaTagBR + 4);
      }

      return texto;
   }


   const onClickOpenChannel = () => {
      dispatch({
         type: 'open',
         name: 'chat',
         title: 'Chat'
      });
      open(channel.lastMessage!)
   }

   let dataFormatada: string = '';
   if (channel.dateTimeLastMessage) {
      let dataMoment: Moment = momentUtils.fromOADateTime(channel.dateTimeLastMessage);
      dataFormatada = dataMoment.format('HH:mm');
   }

   return (
      <li>
         <a role="tab" data-toggle="pill" href={`#${channel.id}`} className={channel.active ? 'active' : ''}
            onClick={onClickOpenChannel}
         >
            <div className="d-flex align-items-center pr-1 ">
               {showAvatar &&
                  <div className="avatar mr-3">
                     <img src="images/user/05.jpg" alt="chatuserimage" className="avatar-50 " />
                     <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success"></i></span>
                  </div>
               }
               {/* <i className={`mdi ${icon} mr-2`} style={{ fontSize: 30 }} /> */}
               <div className="chat-sidebar-name">
                  <h6 className="mb-0">{channel.caption}</h6>
                  <small className="float-left text-truncate text-muted chat-description-channel">{HTMLReactParser(msgTexto)}</small>
               </div>
               <div className="chat-meta float-right text-center mt-2">
                  {channel.qtdNewMessages &&
                     <div className="chat-msg-counter bg-primary text-white">{channel.qtdNewMessages}</div>
                  }
                  <span className="text-nowrap">{dataFormatada}</span>
               </div>
            </div>
         </a>
      </li>
   );
}

export default Channels;
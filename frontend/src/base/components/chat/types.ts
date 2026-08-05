export interface ChatMessage<TChat> {
   id?: string | number,
   message: string,
   data: TChat,
   idChannel: string,
   key: string | number
}

export interface ChatChannels<TChat, TChatConversation> {
   id: string,
   caption: string,
   active: boolean,
   tags?: string,
   lastMessage?: ChatMessage<TChat>,
   dateTimeLastMessage?: number,
   qtdNewMessages?: number,
   // lasConversation?: TChatConversation,
   data: TChat,
   key: string | number
}

export interface ChatConversation<TChatConversation> {
   id?: string | number,
   dateTime: number,
   message: string,
   user: string,
   type: 'left' | 'right',
   data: TChatConversation,
   key: string | number,
   attachment?: ChatAttachment
}

export interface ChatAttachment {
   id?: string | number,
   fileName: string,
   base64: string,
   extension?: string,
}
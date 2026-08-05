import { nanoid } from 'nanoid';

type Channel = {
   name: string,
   callback: (message: Message, messageEventSocket: IMessageEventSocket, socket: ISocket) => void
}

export type Message = {
   type: 'ping' | 'subscribe' | 'message' | 'disconnect' | 'file',
   idclient?: string,
   channel?: string,
   message?: string
}

type Setup = {
   url: string,
   id?: string,
   reconnectInSeconds?: number,
   pingInSeconds?: number
}

interface IEventSocket extends Event { }
interface IMessageEventSocket extends MessageEvent { }
interface ICloseEventSocket extends CloseEvent { }

export interface ISocket {
   onopen?: (EventSocket: IEventSocket, socket: ISocket) => void,
   onerror?: (EventSocket: IEventSocket, socket: ISocket) => void,
   onmessage?: (EventSocket: IMessageEventSocket, socket: ISocket) => void,
   onping?: (socket: ISocket) => void,
   onpong?: (socket: ISocket) => void,
   onchannel(channel: string, callback: (message: Message, messageEventSocket: IMessageEventSocket, socket: ISocket) => void): void,
   beforetConnect?: (socket: ISocket) => void,
   aftertConnect?: (EventSocket: IEventSocket, socket: ISocket) => void,
   connect(): void,
   disconnect(): void,
   subscribe(channel: string): void,
   sendMessage(channel: string, message: string): void,
   sendFile(channel: string, base64: string): void
}

export class Socket implements ISocket {
   private isClose: boolean;
   private id: string;
   private pingpong?: NodeJS.Timeout;
   private channels: Array<Channel>;
   private subscribers: Array<string>;
   private websocket!: WebSocket;
   private setup: Setup;
   public beforetConnect?: (socket: ISocket) => void;
   public aftertConnect?: (EventSocket: IEventSocket, socket: ISocket) => void;
   public onopen?: (EventSocket: IEventSocket, socket: ISocket) => void;
   public onerror?: (EventSocket: IEventSocket, socket: ISocket) => void;
   public onmessage?: (EventSocket: IMessageEventSocket, socket: ISocket) => void;
   public onping?: (socket: ISocket) => void;
   public onpong?: (socket: ISocket) => void;

   constructor(setup: Setup) {
      this.isClose = true;
      this.setup = setup;
      this.channels = [];
      this.subscribers = [];

      if (setup.id !== undefined) {
         this.id = setup.id;
      } else {
         this.id = nanoid();
      }
   }

   private reconnectIn(): number {
      let milliseconds: number = 0;

      if (this.setup !== undefined && this.setup.reconnectInSeconds !== undefined) {
         milliseconds = this.setup.reconnectInSeconds * 1000;
      }

      return milliseconds;
   }

   private pingIn(): number {
      let milliseconds: number = 0;

      if (this.setup !== undefined && this.setup.pingInSeconds !== undefined) {
         milliseconds = this.setup.pingInSeconds * 1000;
      }

      return milliseconds;
   }

   private ping(): void {
      if (this.pingIn() > 0) {
         if (this.pingpong !== undefined) {
            clearInterval(this.pingpong);
         }

         let channel = `ping-${this.id}`;

         this.subscribe(channel);
         this.onchannel(channel, message => {
            if (this.onpong !== undefined) {
               this.onpong(this);
            }
         });

         this.pingpong = setInterval(() => {
            if (this.websocket !== undefined && this.websocket.readyState === this.websocket.OPEN) {

               let objMessage: Message = {
                  type: 'ping',
                  idclient: this.id,
                  channel: channel
               };

               this.websocket.send(JSON.stringify(objMessage));

               if (this.onping !== undefined) {
                  this.onping(this);
               }
            }
         }, this.pingIn());
      }
   }

   private reconnect(CloseEventSocke: ICloseEventSocket): void {
      if (this.reconnectIn() > 0 && !this.isClose) {
         // console.log(`Socket is closed. Reconnect will be attempted in ${this.setup?.reconnectInSeconds} second.`, CloseEventSocke.reason);
         let reconnect = setInterval(() => {
            this.startConnect(true);
            clearInterval(reconnect);
         }, this.reconnectIn());
      }
   }

   private findChannel(name?: string): Channel | undefined {
      if (name === undefined) {
         return;
      }

      let _channel = undefined;
      this.channels.forEach(channel => {
         if (name === channel.name) {
            _channel = channel;
         }
      });

      return _channel;
   }

   private findSubscribers(channelName?: string): string | undefined {
      if (channelName === undefined) {
         return;
      }

      let _subscriber = undefined;
      this.subscribers.forEach(subscriber => {
         if (channelName === subscriber) {
            _subscriber = subscriber;
         }
      });

      return _subscriber;
   }

   private reEnroll() {
      this.subscribers.forEach(subscriber => {
         this.internalSubscribe(subscriber);
         // console.log(`reEnroll - ${subscriber}`);
      });
   }

   private startConnect(reEnroll: boolean = false): void {
      this.isClose = false;
      var self = this;

      if (this.beforetConnect)
         this.beforetConnect(this);

      this.websocket = new WebSocket(this.setup.url);

      this.websocket.onopen = (e: Event) => {
         if (this.aftertConnect)
            this.aftertConnect(e, this);

         if (this.onopen) {
            this.onopen(e, this);
         }

         if (reEnroll) {
            this.reEnroll();
         }

         this.ping();
      };

      this.websocket.onmessage = (e: MessageEvent) => {
         if (this.onmessage !== undefined) {
            this.onmessage(e, this);
         }
         let jsonText: string = e.data;
         // console.log(jsonText);
         let jsonFormated: string = jsonText.replace(/(\r\n|\n|\r)/gm, ""); /*remoção de quebra de linha no base 64*/
         // console.log(jsonFormated);
         let message: Message = JSON.parse(jsonFormated);

         if (message.type === 'subscribe') {
            return;
         }

         let channel = this.findChannel(message.channel);

         if (channel) {

            if (message.type === 'message' && message.message !== undefined && message.message.trim() !== '') {
               message.message = atob(message.message); // Buffer.from(message.message, 'base64').toString();
            }

            channel.callback(message, e, this);
         }
      };

      this.websocket.onclose = (e: CloseEvent) => {
         if (this.pingpong) {
            clearInterval(this.pingpong);
         }
         this.reconnect(e);
      };

      this.websocket.onerror = (e: Event) => {
         console.error('Socket encountered error. Closing socket');
         if (this.onerror) {
            this.onerror(e, this);
         }
         self.websocket.close();
      };
   }

   private internalSubscribe(channel: string): void {
      if (this.websocket !== undefined && this.websocket.readyState === this.websocket.OPEN) {

         let objMessage: Message = {
            type: 'subscribe',
            idclient: this.id,
            channel: channel
         };

         this.websocket.send(JSON.stringify(objMessage));
      }
   }

   onchannel(channel: string, callback: (message: Message, messageEventSocket: IMessageEventSocket, socket: ISocket) => void): void {

      if (this.findChannel(channel) === undefined) {
         // console.log(channel);
         this.channels.push({
            name: channel,
            callback: callback
         });
      }
   }

   connect(): void {
      if (this.websocket === undefined || this.websocket.readyState === this.websocket.CLOSING) {
         this.startConnect();
      }
   }

   disconnect(): void {
      try {
         let objMessage: Message = {
            type: 'disconnect',
            idclient: this.id
         };

         this.websocket.send(JSON.stringify(objMessage));
      } catch (error) {
         console.log(error)
      }

      console.log('disconnect');
      this.isClose = true;
      this.websocket.close();
   }

   subscribe(channel: string): void {
      if (this.findSubscribers(channel) === undefined) {
         this.subscribers.push(channel);
      }

      this.internalSubscribe(channel);
      console.log(`subscribe - ${channel}`);
   }

   sendMessage(channel: string, message: string = ''): void {
      if (this.websocket !== undefined && this.websocket.readyState === this.websocket.OPEN) {

         let messageBase64: string = '';

         if (message !== '') {
            messageBase64 = btoa(message);// Buffer.from(message).toString('base64');
         }

         let objMessage: Message = {
            type: 'message',
            idclient: this.id,
            channel: channel,
            message: messageBase64
         };

         this.websocket.send(JSON.stringify(objMessage));
      }
   }

   sendFile(channel: string, base64: string): void {
      if (this.websocket !== undefined && this.websocket.readyState === this.websocket.OPEN) {

         let objMessage: Message = {
            type: 'file',
            idclient: this.id,
            channel: channel,
            message: base64
         };

         this.websocket.send(JSON.stringify(objMessage));
      }
   }
}

interface ISocketService {
   create: (setup: Setup) => ISocket,
   socket: () => ISocket
}

const SocketService = (function () {
   var instance: ISocketService;
   var socket: ISocket;

   const createInstance = (): ISocketService => {
      return {
         create(setup) {
            socket = new Socket(setup);
            return socket;
         },
         socket() {
            return socket;
         },
      }
   }

   return {
      getInstance: function () {
         if (!instance) {
            instance = createInstance();
         }
         return instance;
      }
   };
})();

export default SocketService;
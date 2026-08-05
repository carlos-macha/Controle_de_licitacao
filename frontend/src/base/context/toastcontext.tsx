import HTMLReactParser from 'html-react-parser';
import { nanoid } from 'nanoid';
import React from 'react';
import { Toast, ToastProps } from 'react-bootstrap';

interface IToastIDs {
   id: string,
   toast: JSX.Element
}

type TToastType = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light";

type ToastAction = {
   type: 'show',
   props: ToastProps,
   msg: string | JSX.Element,
   typeAlert: TToastType,
   cssIcon?: string,
   onClose?: (idToast: string) => void
} | {
   type: 'close',
   id: string
}

type ToastDispatch = (action: ToastAction) => void;

type ToastState = {
   toast: Array<IToastIDs>
}

interface ToastProviderProps { }

export interface ToastContextProps {
   toastState: ToastState,
   toastDispatch: ToastDispatch,
   ToastContainer: React.FC,
   addToast: (props: ToastProps, msg: string | JSX.Element, typeAlert: TToastType, cssIcon?: string, onClose?: () => void) => void
}

export const ToastStateContext = React.createContext<ToastContextProps | undefined>(undefined);

var ToastReducer = (state: ToastState, action: ToastAction): ToastState => {
   let type: string = action.type;
   switch (action.type) {
      case 'show': {
         let _toats = [...state.toast];
         let idToast = nanoid();

         let icon: string = 'mdi mdi-alert-outline';

         switch (action.typeAlert) {
            case 'success':
               icon = 'mdi mdi-check-bold'
               break;

            case 'danger':
               icon = 'mdi mdi-alert-circle-outline'
               break;

            default:
               break;
         }

         if (action.cssIcon)
            icon = action.cssIcon;

         _toats.push({
            id: idToast,
            toast: <Toast
               key={`toast-${idToast}`}
               onClose={() => {
                  if (action.onClose && action.props.autohide)
                     action.onClose(idToast);
               }}
               // show={action.props.show}
               animation={action.props.animation}
               autohide={action.props.autohide}
               delay={action.props.delay}
               transition={action.props.transition}
               bg={action.props.bg}
            >
               <Toast.Body className='p-0 m-0'>
                  <div className={`alert bg-white alert-${action.typeAlert} m-0`} role="alert">
                     <div className="iq-alert-icon">
                        <i className={icon} />
                     </div>
                     <div className="iq-alert-text">
                        {
                           typeof action.msg === 'string' ?
                              HTMLReactParser(action.msg.replace(/(\r\n|\n|\r)/gm, "<br>")) :
                              action.msg
                        }
                     </div>
                  </div>
               </Toast.Body>
            </Toast>
         })
         return {
            toast: _toats
         }
      }

      case 'close': {
         let _toats = state.toast.filter(toast => {
            return toast.id !== action.id;
         })
         return {
            toast: _toats
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${type}`)
      }
   }
}

const ToastProvider: React.FC<ToastProviderProps> = (props): JSX.Element => {

   let toast: Array<IToastIDs> = [];

   const [toastState, toastDispatch] = React.useReducer(ToastReducer, { toast });

   const addToast = (props: ToastProps, msg: string | JSX.Element, typeAlert: TToastType, cssIcon?: string, onClose?: () => void) => {
      toastDispatch({
         type: 'show',
         msg,
         typeAlert,
         props,
         cssIcon,
         onClose(idToast) {
            if (onClose)
               onClose();

            toastDispatch({
               type: 'close',
               id: idToast
            });
         },
      })
   }

   const ToastContainer: React.FC = (props) => {

      const els: Array<JSX.Element> = [];
      toastState.toast.forEach(toast => {
         els.push(toast.toast);
      })

      return (
         <div
            style={{
               position: 'absolute',
               top: 0,
               right: 0,
               zIndex: 1000,
               margin: 5
            }}
         >
            {els}
         </div>
      );
   }


   const value: ToastContextProps = { toastState, toastDispatch, ToastContainer, addToast };
   return (
      <ToastStateContext.Provider value={value}>
         {props.children}
      </ToastStateContext.Provider>
   );
}

export default ToastProvider;
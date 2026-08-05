import React from 'react';
import { SweetAlertProps, SweetAlertType } from 'react-bootstrap-sweetalert/dist/types';

type SweetAlertAction = {
   type: 'show',
   msg?: string | JSX.Element,
   props: SweetAlertProps | undefined
} | {
   type: 'close'
}

type SweetAlertDispatch = (action: SweetAlertAction) => void;

type SweetAlertState = {
   props: SweetAlertProps | undefined,
   msg?: string | JSX.Element,
}

interface SweetAlertProviderProps { }

export interface SweetAlertContextProps {
   sweetAlertState: SweetAlertState,
   sweetAlertdispatch: SweetAlertDispatch,
   showSweetAlertMessage: (
      type: SweetAlertType,
      title: string,
      msg?: string | JSX.Element | undefined,
      closeOnConfirm?: boolean,
      onConfirm?: (response?: any) => any
   ) => void
}

export const SweetAlertStateContext = React.createContext<SweetAlertContextProps | undefined>(undefined);

var SweetAlertReducer = (state: SweetAlertState, action: SweetAlertAction): SweetAlertState => {
   let type: string = action.type;
   switch (action.type) {
      case 'show': {
         return {
            msg: action.msg,
            props: action.props,
         }
      }
      case 'close': {
         return {
            props: undefined
         }
      }
      default: {
         throw new Error(`Unhandled action type: ${type}`)
      }
   }
}

const SweetAlertProvider: React.FC<SweetAlertProviderProps> = (props): JSX.Element => {
   const [sweetAlertState, sweetAlertdispatch] = React.useReducer(SweetAlertReducer, { props: undefined });

   const showSweetAlertMessage = (
      type: SweetAlertType,
      title: string,
      msg?: string | JSX.Element | undefined,
      closeOnConfirm: boolean = true,
      onConfirm?: (response?: any) => any,
      props?: SweetAlertProps) => {
      sweetAlertdispatch({
         type: 'show',
         props: {
            title: title,
            type: type,
            onConfirm(response) {
               if (closeOnConfirm)
                  sweetAlertdispatch({ type: 'close' });

               if (onConfirm)
                  onConfirm(response);
            }
         },
         msg
      })
   }

   const closeSweetAlertMessage = () => {
      sweetAlertdispatch({
         type: 'close'
      })
   }


   const value: SweetAlertContextProps = { sweetAlertState, sweetAlertdispatch, showSweetAlertMessage };
   return (
      <SweetAlertStateContext.Provider value={value}>
         {props.children}
      </SweetAlertStateContext.Provider>
   );
}

export default SweetAlertProvider;
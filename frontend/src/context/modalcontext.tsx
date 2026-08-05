import React from 'react';
import { IModelDoc001 } from '../base/2/modeldoc001';
import { IModelDoc002 } from '../base/2/modeldoc002';
import { IModelDoc004 } from '../base/2/modeldoc004';
import { IModelDoc005 } from '../base/2/modeldoc005';
import { IModelSis003 } from '../base/2/modelsis003';

type ModalAction = {
   type: 'politicas&termos',
   render: JSX.Element,
   title: string,
   onRender?: () => void,
   onBtnCloseModal?: () => void
}


type ModalDispatch = (action: ModalAction) => void;

type ModalState = {
   type: undefined | 'politicas&termos',
   render?: JSX.Element,
   title?: string,
   onRender?: () => void,
   onBtnCloseModal?: () => void
}

interface ModalProviderProps { }

export interface ModalContextProps {
   modalState: ModalState,
   modalDispash: ModalDispatch
}

export const ModalStateContext = React.createContext<ModalContextProps | undefined>(undefined);

var ModalReducer = (modalState: ModalState, modalAction: ModalAction): ModalState => {
   let type: string = modalAction.type;
   switch (modalAction.type) {

      case 'politicas&termos': {
         return {
            type: 'politicas&termos',
            render: modalAction.render,
            title: modalAction.title,
            onRender: modalAction.onRender,
            onBtnCloseModal: modalAction.onBtnCloseModal
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${type}`)
      }
   }
}

const ModalProvider: React.FC<ModalProviderProps> = (props): JSX.Element => {
   const [modalState, modalDispash] = React.useReducer(ModalReducer, { type: undefined });

   const value: ModalContextProps = { modalState, modalDispash };
   return (
      <ModalStateContext.Provider value={value}>
         {props.children}
      </ModalStateContext.Provider>
   );
}

export default ModalProvider;
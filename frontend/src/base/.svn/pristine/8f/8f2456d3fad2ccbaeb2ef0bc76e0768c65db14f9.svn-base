import React from 'react';

type CrudAction = {
   type: 'actNone'
} | {
   type: 'actInsert' | 'actEdit' | 'actDelete',
   data: any
}


type CrudDispatch = (action: CrudAction) => void;

type CrudState = {
   type: 'actNone' | 'actInsert' | 'actEdit' | 'actDelete',
   data: any,
   value?: any
}

interface CrudProviderProps {
   value?: any
}

export interface CrudContextProps {
   crudState: CrudState,
   crudDispash: CrudDispatch
}

export const CrudStateContext = React.createContext<CrudContextProps | undefined>(undefined);

var CrudReducer = (crudState: CrudState, crudAction: CrudAction): CrudState => {
   let type: string = crudAction.type;
   switch (crudAction.type) {
      case 'actNone': {
         return {
            type: 'actNone',
            data: undefined
         }
      }

      case 'actInsert':
      case 'actEdit':
      case 'actDelete': {
         return {
            type: crudAction.type,
            data: crudAction.data
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${type}`)
      }
   }
}

const CrudProvider: React.FC<CrudProviderProps> = (props): JSX.Element => {
   const { value } = props;
   const [crudState, crudDispash] = React.useReducer(CrudReducer, { type: 'actNone', data: undefined, value });

   const valueProps: CrudContextProps = { crudState, crudDispash };
   return (
      <CrudStateContext.Provider value={valueProps}>
         {props.children}
      </CrudStateContext.Provider>
   );
}

export default CrudProvider;
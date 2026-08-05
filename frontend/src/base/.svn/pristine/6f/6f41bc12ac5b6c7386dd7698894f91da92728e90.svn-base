import React from 'react';
import { MenuType } from '../types';

type Action = {
   type: 'open',
   name?: MenuType<any>,
   title?: string,
   data?: any,
   origem?: string
} | {
   type: 'close',
   name?: MenuType<any>,
   title?: string
} | {
   type: 'close all'
}

type Dispatch = (action: Action) => void;

type ItemMenu = {
   type?: 'open' | 'close' | 'close all',
   name?: MenuType<any>,
   title?: string,
   data?: any,
   origem?: string
}

interface MenuProviderProps { itemMenu?: ItemMenu }

export interface MenuContextProps {
   itemMenu: ItemMenu,
   dispatch: Dispatch
}

export const MenuStateContext = React.createContext<MenuContextProps | undefined>(undefined);

var MenuReducer = (itemNenu: ItemMenu, action: Action): ItemMenu => {
   let type: string = action.type;
   switch (action.type) {
      case 'open': {
         return {
            type: action.type,
            name: action.name,
            title: action.title,
            data: action.data,
            origem: action.origem
         }
      }
      case 'close': {
         return {
            type: action.type,
            name: action.name,
            title: action.title
         }
      }
      case 'close all': {
         return {}
      }

      default: {
         throw new Error(`Unhandled action type: ${type}`)
      }
   }
}

const MenuProvider: React.FC<MenuProviderProps> = (props): JSX.Element => {
   const [itemMenu, dispatch] = React.useReducer(MenuReducer, { ...props.itemMenu });

   const value: MenuContextProps = { itemMenu, dispatch };
   return (
      <MenuStateContext.Provider value={value}>
         {props.children}
      </MenuStateContext.Provider>
   );
}

export default MenuProvider;
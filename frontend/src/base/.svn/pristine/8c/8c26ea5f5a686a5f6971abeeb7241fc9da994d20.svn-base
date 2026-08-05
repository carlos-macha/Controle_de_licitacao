import React from "react";
import { MenuContextProps, MenuStateContext } from "../context/menucontext";

export function useMenuContext(): MenuContextProps {
   const context = React.useContext<MenuContextProps | undefined>(MenuStateContext);

   if (context === undefined) {
      throw new Error('useMenuContext must be used within a MenuProvider')
   }
   return context
}
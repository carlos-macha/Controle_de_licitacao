import React from "react";
import { CrudContextProps, CrudStateContext } from "../context/crudcontext";

export function useCrudContext(): CrudContextProps {
   const context = React.useContext<CrudContextProps | undefined>(CrudStateContext);

   if (context === undefined) {
      throw new Error('useCrudContext must be used within a MenuProvider')
   }

   return context
}
import React from "react";
import { ModalContextProps, ModalStateContext } from "../context/modalcontext";

export function useModalContext(): ModalContextProps {
   const context = React.useContext<ModalContextProps | undefined>(ModalStateContext);

   if (context === undefined) {
      throw new Error('useModalContext must be used within a ModalProvider')
   }

   return context
}
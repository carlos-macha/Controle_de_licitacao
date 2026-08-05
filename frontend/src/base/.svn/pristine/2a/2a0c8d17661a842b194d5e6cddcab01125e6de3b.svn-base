import React from "react";
import { ToastContextProps, ToastStateContext } from "../context/toastcontext";

export function useToastContext(): ToastContextProps {
   const context = React.useContext<ToastContextProps | undefined>(ToastStateContext);

   if (context === undefined) {
      throw new Error('useToastContext must be used within a ToastProvider')
   }
   return context
}
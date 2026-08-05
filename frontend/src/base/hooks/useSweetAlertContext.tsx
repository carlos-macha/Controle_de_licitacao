import React from "react";
import { SweetAlertContextProps, SweetAlertStateContext } from "../context/sweetalertcontext";

export function useSweetAlertContext(): SweetAlertContextProps {
   const context = React.useContext<SweetAlertContextProps | undefined>(SweetAlertStateContext);

   if (context === undefined) {
      throw new Error('useSweetAlertContext must be used within a SweetAlertProvider')
   }
   return context
}
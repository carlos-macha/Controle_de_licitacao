import React from "react";
import { AuthStateContext, ContextProps } from "../context/authcontext";

export function useAuthContext(): ContextProps {
   const context = React.useContext<ContextProps | undefined>(AuthStateContext);

   if (context === undefined) {
      throw new Error('useAuthContext must be used within a AuthProvider')
   }

   return context
}
import React from 'react';
import { DataRoutesLock, DataRoutesLogout } from '../routes/dataroutes';
import { Navigate } from 'react-router-dom';
import { IUsuarioLogado } from '../models/modelLogin';
import {
   storageGetUser,
   storageSetUser,
   storageGetLogged,
   storageSetLogged,
   storageGetLock,
   storageSetLock,
   storageGetDark,
   storageGetRemindMe,
   storageSetRemindMe,
   storageSetWSToken,
   STORAGE_NAME_CPLICITACAO_LOCK,
   STORAGE_NAME_CPLICITACAO_LOGGED
} from '../utils/storage';

type AuthAction = {
   type: 'login',
   remindMe?: boolean,
   user: IUsuarioLogado,
   token: string
} | {
   type: 'logoff'
} | {
   type: 'unlock'
} | {
   type: 'lock'
} | {
   type: 'profile' | 'reset-pass',
   user: IUsuarioLogado
} | {
   type: 'tema',
   isDark: boolean
}

type AuthDispatch = (authAction: AuthAction) => void

export type AuthState = {
   logged: boolean,
   logout?: boolean,
   remindMe?: boolean,
   lock?: boolean,
   user: IUsuarioLogado,
   isDark?: boolean
}

type AuthProviderProps = { children: React.ReactNode }

export interface ContextProps {
   authState: AuthState,
   authDispatch: AuthDispatch
}

export const AuthStateContext = React.createContext<ContextProps | undefined>(undefined);

var AuthReducer = (authState: AuthState, action: AuthAction): AuthState => {
   let type: string = action.type;
   switch (action.type) {
      case 'tema': {
         let user: IUsuarioLogado | undefined = storageGetUser();
         return {
            isDark: action.isDark,
            logged: true,
            user: user!
         }
      }

      case 'login': {
         storageSetWSToken(action.token);

         storageSetLogged(true);
         storageSetLock(false);
         storageSetRemindMe(action.remindMe!);
         storageSetUser(action.user);
         return {
            logged: true,
            remindMe: action.remindMe!,
            user: action.user,
            isDark: storageGetDark()
         }
      }
      case 'logoff': {
         let remindMe: boolean = storageGetRemindMe();
         let user: IUsuarioLogado | undefined = storageGetUser();

         localStorage.removeItem(STORAGE_NAME_CPLICITACAO_LOCK);
         localStorage.removeItem(STORAGE_NAME_CPLICITACAO_LOGGED);

         <Navigate to={DataRoutesLogout.path} />
         return {
            logged: false,
            logout: true,
            remindMe,
            user: user!,
            isDark: storageGetDark()
         }
      }
      case 'unlock': {
         storageSetLock(false);
         storageSetLogged(true);
         let remindMe: boolean = storageGetRemindMe();
         let user: IUsuarioLogado | undefined = storageGetUser();
         return {
            logged: true,
            remindMe,
            user: user!,
            lock: false,
            isDark: storageGetDark()
         }
      }
      case 'lock': {
         storageSetLock(true);
         localStorage.removeItem(STORAGE_NAME_CPLICITACAO_LOGGED);
         let remindMe: boolean = storageGetRemindMe();
         let user: IUsuarioLogado | undefined = storageGetUser();
         <Navigate to={DataRoutesLock.path} />
         return {
            logged: true,
            remindMe,
            user: user!,
            lock: true,
            isDark: storageGetDark()
         }
      }

      case 'reset-pass':
      case 'profile': {
         let remindMe: boolean = storageGetRemindMe();
         storageSetUser(action.user);
         return {
            logged: true,
            remindMe,
            user: action.user,
            lock: false,
            isDark: storageGetDark()
         }
      }
      default: {
         throw new Error(`Unhandled action type: ${type}`)
      }
   }
}

export const AuthProvider: React.FC<AuthProviderProps> = (props): JSX.Element => {

   let logged: boolean = storageGetLogged();
   let lock: boolean = storageGetLock();
   let remindMe: boolean = storageGetRemindMe();
   let user: IUsuarioLogado | undefined = storageGetUser();
   let isDark: boolean = storageGetDark();

   const [authState, authDispatch] = React.useReducer(AuthReducer, {
      logged,
      lock,
      remindMe,
      user: user!,
      isDark
   });

   const value: ContextProps = { authState, authDispatch };
   return (
      <AuthStateContext.Provider value={value}>
         {props.children}
      </AuthStateContext.Provider>
   );
}
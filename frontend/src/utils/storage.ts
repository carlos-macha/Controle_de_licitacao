import { IModelLogin, IUsuarioLogado } from "../models/modelLogin";
import { Storage } from "../base/services/storage";

export const STORAGE_NAME_CPLICITACAO_LOGGED = 'cplicitacao-logged';
export const STORAGE_NAME_CPLICITACAO_LOCK = 'cplicitacao-lock';
export const STORAGE_NAME_CPLICITACAO_REMINDME = 'cplicitacao-remindMe';
export const STORAGE_NAME_CPLICITACAO_WSHOST: string = 'cplicitacao-wshost';
export const STORAGE_NAME_CPLICITACAO_TOKEN = 'cplicitacao-token';
export const STORAGE_NAME_CPLICITACAO_WSTIMEOUT: string = 'cplicitacao-wstimeout';
export const STORAGE_NAME_CPLICITACAO_USER_DATA = 'cplicitacao-user-data';
export const STORAGE_NAME_CPLICITACAO_DARK = 'cplicitacao-dark';

export const storageSetLogged = (logged: boolean): void => {
   localStorage.setItem(STORAGE_NAME_CPLICITACAO_LOGGED, logged ? 'S' : 'N')
}

export const storageGetLogged = (): boolean => {
   if (localStorage.getItem(STORAGE_NAME_CPLICITACAO_LOGGED) !== null)
      return localStorage.getItem(STORAGE_NAME_CPLICITACAO_LOGGED) === 'S';

   return false;
}

export const storageSetLock = (logged: boolean): void => {
   localStorage.setItem(STORAGE_NAME_CPLICITACAO_LOCK, logged ? 'S' : 'N')
}

export const storageGetLock = (): boolean => {
   if (localStorage.getItem(STORAGE_NAME_CPLICITACAO_LOCK) !== null)
      return localStorage.getItem(STORAGE_NAME_CPLICITACAO_LOCK) === 'S';
   return false;
}

export const storageSetRemindMe = (remindMe: boolean): void => {
   localStorage.setItem(STORAGE_NAME_CPLICITACAO_REMINDME, remindMe ? 'S' : 'N')
}

export const storageGetRemindMe = (): boolean => {
   if (localStorage.getItem(STORAGE_NAME_CPLICITACAO_REMINDME) !== null)
      return localStorage.getItem(STORAGE_NAME_CPLICITACAO_REMINDME) === 'S'

   return false;
}

export const storageSetWSHost = (host: string): void => {
   localStorage.setItem(STORAGE_NAME_CPLICITACAO_WSHOST, host);
}

export const storageGetWSHost = (): string => {
   if (localStorage.getItem(STORAGE_NAME_CPLICITACAO_WSHOST) !== null)
      return String(localStorage.getItem(STORAGE_NAME_CPLICITACAO_WSHOST));

   return '';
}

export const storageSetWSToken = (token: string): void => {
   localStorage.setItem(STORAGE_NAME_CPLICITACAO_TOKEN, token);
}

export const storageGetWSToken = (): string => {
   if (localStorage.getItem(STORAGE_NAME_CPLICITACAO_TOKEN) !== null)
      return String(localStorage.getItem(STORAGE_NAME_CPLICITACAO_TOKEN));

   return '';
}

export const storageSetWSTimeout = (timeout: number): void => {
   localStorage.setItem(STORAGE_NAME_CPLICITACAO_WSTIMEOUT, String(timeout));
}

export const storageGetWSTimeout = (): number => {
   if (localStorage.getItem(STORAGE_NAME_CPLICITACAO_WSTIMEOUT) !== null)
      return Number(localStorage.getItem(STORAGE_NAME_CPLICITACAO_WSTIMEOUT));

   return 60000;
}

export const storageSetUser = (user:IUsuarioLogado) => {
   localStorage.setItem(
      STORAGE_NAME_CPLICITACAO_USER_DATA,
      JSON.stringify(user)
   );
}

export const storageGetUser = (): IUsuarioLogado | undefined => {
   if (localStorage.getItem(STORAGE_NAME_CPLICITACAO_USER_DATA) !== null)
      return Storage.getObject(STORAGE_NAME_CPLICITACAO_USER_DATA) as IUsuarioLogado;

   return undefined;
}

export const storageSetDark = (dark: boolean): void => {
   localStorage.setItem(STORAGE_NAME_CPLICITACAO_DARK, dark ? 'S' : 'N');
}

export const storageGetDark = (): boolean => {
   if (localStorage.getItem(STORAGE_NAME_CPLICITACAO_DARK) !== null)
      return localStorage.getItem(STORAGE_NAME_CPLICITACAO_DARK) === 'S';

   return false;
}
import axios, { AxiosInstance } from "axios";

export interface IResponseJsonStatus {
   Status: "OK" | "DELETED"
}

interface IApi {
   create: (urlBase: string, timeout?: number) => void,
   conn: () => AxiosInstance | undefined,
   // loadIni: () => void,
   // ini: () => Promise<ConfigIniProps>,
   auth: (user: string, pass: string) => void,
   authp: (user: string, pass: string) => Promise<void>,
   noAuth: () => void
}

export interface ApiInstance extends AxiosInstance { };

const Api = (function () {
   var instance: IApi;
   var api: AxiosInstance | undefined;

   const createInstance = (): IApi => {
      return {
         create(urlBase, timeout) {
            if (urlBase) {
               api = axios.create({
                  baseURL: urlBase,
                  timeout: timeout ? timeout : 60000,
                  withCredentials: true, // <-- essencial: manda/recebe o cookie httpOnly
                  headers: {
                     "Content-Type": "application/json"
                  }
               });
            }
         },
         conn() {
            return api;
         },
         noAuth() {
            if (api) {
               delete api.defaults.auth;
            }
         },
         auth(user, pass) {
            if (api) {
               api.defaults.headers.common['Authorization'] =
                  "Basic " + btoa(`${user}:${pass}`);
            }
         },
         authp(user, pass) {
            return new Promise<void>((resolve, reject) => {
               try {
                  if (api)
                     api.defaults.auth = {
                        username: user,
                        password: pass
                     }
                  resolve();
               } catch (error) {
                  console.log(error)
                  reject();
               }
            });
         }
      }
   }

   return {
      getInstance: function () {
         if (!instance) {
            instance = createInstance();
         }
         return instance;
      }
   };
})();

export default Api;
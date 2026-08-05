import Api, { ApiInstance } from "../services/api";
import { storageGetWSHost, storageGetWSTimeout } from "../../utils/storage";
import { fetchWithRetry } from "../utils/fetchwithretry";

export default class DAO {
   protected api: ApiInstance;

   constructor() {

      if (!Api.getInstance().conn()) {
         Api.getInstance().create(
            storageGetWSHost(),
            storageGetWSTimeout()
         );
      }

      this.api = Api.getInstance().conn()!;
   }

   List = <T>(resource: string) => fetchWithRetry(() => new Promise<Array<T>>((resolve, reject) => {
      this.api.get<Array<T>>(resource).then(async (response: { data: Array<T> | PromiseLike<Array<T>>; }) => {
         resolve(response.data);
      }).catch((error: any) => {
         reject(error);
      });
   }));

   Get = <T>(resource: string) => fetchWithRetry(() => new Promise<T>((resolve, reject) => {
      this.api.get<T>(resource).then(async (response: { data: T | PromiseLike<T>; }) => {
         resolve(response.data);
      }).catch((error: any) => {
         reject(error);
      });
   }))

   Delete = <T>(resource: string) => new Promise<T>((resolve, reject) => {
      this.api.delete<T>(resource).then(async (response: { data: T | PromiseLike<T>; }) => {
         resolve(response.data);
      }).catch((error: any) => {
         reject(error);
      });
   });

   Put = <T>(resource: string, model?: T) => new Promise<T>((resolve, reject) => {
      this.api.put<T>(resource, model).then(async (response: { data: T | PromiseLike<T>; }) => {
         resolve(response.data);
      }).catch((error: any) => {
         reject(error);
      });
   });

   Post = <T>(resource: string, model?: T) => new Promise<T>((resolve, reject) => {

   console.log("POST RESOURCE:", resource);
   console.log("POST BODY:", model);
   console.log("AUTH NO POST:", this.api.defaults.headers.common['Authorization']);

   this.api.post<T>(resource, model)
      .then(response => {
         resolve(response.data);
      })
      .catch(error => {
         console.log("ERRO POST:", error);
         reject(error);
      });
});
}
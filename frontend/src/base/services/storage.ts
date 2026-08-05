import { utilities } from "../utils/utilities";

export class Storage {

   static get(key: string): string | null {
      return localStorage.getItem(key);
   }

   static getObject(key: string): any {
      let object = null;

      let value: string | null = localStorage.getItem(key);

      if (value !== '' && value !== null) {

         let data: string = utilities.base64Decode(String(value));

         if (data !== '') {
            object = JSON.parse(data);
         }

      }

      return object;
   }

   static set(key: string, value: string) {
      localStorage.setItem(key, value);
   }

   static setObject(key: string, data: object | undefined) {
      if (data) {
         localStorage.setItem(key, utilities.base64(JSON.stringify(data)));
      } else {
         localStorage.setItem(key, '');
      }
   }
}
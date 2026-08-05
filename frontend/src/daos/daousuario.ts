import DAO from "../base/daos/dao";
import { IModelLogin, IModelLoginResponse } from "../models/modelLogin";
import { IModelUnlock, IModelUnlockResponse } from "../models/modelUnlock";

export default class DAOUsuario extends DAO {

   Login = (jsonLogin: IModelLogin) => new Promise<IModelLoginResponse>((resolve, reject) => {
      this.Post<IModelLoginResponse>(`/login`, jsonLogin as unknown as IModelLoginResponse).then(data => {
         resolve(data);
      }).catch(error => {
         console.log(error)
         reject(
            error.response?.data?.message ??
            "Erro ao realizar login"
         );
      });
   });

   Unlock = (jsonUnlock: IModelUnlock) => new Promise<IModelUnlockResponse>((resolve, reject) => {
         this.Post<IModelUnlockResponse>(`/unlock`, jsonUnlock as unknown as IModelUnlockResponse).then(data => {
            resolve(data);
         }).catch(error => {
            console.log(error);
            reject(
               error.response?.data?.message ??
               "Senha inválida"
            );

         });

      });

}
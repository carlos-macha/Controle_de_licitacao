import DAOUsuario from "../daos/daousuario";
import { IModelLogin, IModelLoginResponse } from "../models/modelLogin";
import { storageGetWSHost, storageGetWSTimeout, storageGetWSToken, storageSetUser, storageSetWSToken } from "../utils/storage";
import Controller from "../base/controllers/controller";
import Api from "../base/services/api";
import { IModelUnlock, IModelUnlockResponse } from "../models/modelUnlock";

export default class ControllerUsuario extends Controller<DAOUsuario> {

   constructor() {

      super(DAOUsuario);

      if (!Api.getInstance().conn()) {
         Api.getInstance().create(
            storageGetWSHost(),
            storageGetWSTimeout()
         );
      }

      const token = storageGetWSToken();

      if (token) {
         Api.getInstance().token(token);
      }
   }

   Login = (usuario: string, senha: string) => new Promise<IModelLoginResponse>((resolve, reject) => {
      let json: IModelLogin = {
         LOGIN: usuario,
         SENHA: senha
      }

      this.DAO.Login(json).then(data => {
         storageSetUser(data.usuario);
         storageSetWSToken(data.token);

         Api.getInstance().token(data.token);
         resolve(data);
      }).catch(error => {
         reject(error);
      });

   });

   Unlock = (senha: string) =>
      new Promise<IModelUnlockResponse>((resolve, reject) => {

         console.log(
            "AUTH:",
            Api.getInstance().conn()?.defaults.headers.common['Authorization']
         );

         const json: IModelUnlock = {
            SENHA: senha
         };

         this.DAO.Unlock(json)
            .then(resolve)
            .catch(reject);

      });

}
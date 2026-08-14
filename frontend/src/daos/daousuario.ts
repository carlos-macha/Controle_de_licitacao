import DAO from "../base/daos/dao";
import { IModelAtualizarNome, IModelAtualizarSenha } from "../models/modelAtualizarUsuario";
import { IModelLogin, IModelLoginResponse } from "../models/modelLogin";
import { IModelUnlock, IModelUnlockResponse } from "../models/modelUnlock";
import { IModelUsuario } from "../models/modelUsuario";

export default class DAOUsuario extends DAO {

   Login = (jsonLogin: IModelLogin) => new Promise<IModelLoginResponse>((resolve, reject) => {
      this.Post<IModelLoginResponse, IModelLogin>(`/login`, jsonLogin).then(data => {
         resolve(data);
      }).catch(error => {
         console.log(error)
         if (error.response?.status === 429) {
            reject(
               error.response?.data?.error ??
               "Muitas tentativas de login. Tente novamente mais tarde."
            );
            return;
         }

         reject(
            error.response?.data?.error ??
            "Erro ao realizar login"
         );
      });
   });

   logout = (): Promise<any> =>
      this.Post<any>('/logout');

   Unlock = (jsonUnlock: IModelUnlock) => new Promise<IModelUnlockResponse>((resolve, reject) => {
      this.Post<IModelUnlockResponse, IModelUnlock>(`/unlock`, jsonUnlock).then(data => {
         resolve(data);
      }).catch(error => {
         console.log(error);
         reject(
            error.response?.data?.error ??
            "Senha inválida"
         );
      });
   });

   GetPerfil = () =>
      this.Get<IModelUsuario>(`/perfil`);

   AtualizarNome = (jsonNome: IModelAtualizarNome) =>
      this.Put<IModelUsuario, IModelAtualizarNome>(`/atualizar-nome`, jsonNome);

   AtualizarSenha = (jsonSenha: IModelAtualizarSenha) =>
      this.Put<IModelUsuario, IModelAtualizarSenha>(`/atualizar-senha`, jsonSenha);

}
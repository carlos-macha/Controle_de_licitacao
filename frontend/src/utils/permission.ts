import { EnumOperacaoPermissao } from "../base/enums/enums";
import { EnumPermissoes } from "../base/enumsss/enumscontroldoc";
// import ControllerUsuario from "../controllers/controllerusuario";

export class PermissionUtils {

   static checkPermission = (permission?: EnumPermissoes | any, operacao?: EnumOperacaoPermissao, observacao?: string) => new Promise<boolean>((resolve, reject) => {

      if (!permission) {
         resolve(true);
         return;
      }

      // let controller = new ControllerUsuario();
      // controller.ValidarPermissaoUsuario(permission, operacao, observacao).then(data => {
      //    resolve(true);
      // }).catch(error => {
      //    console.log(error);
      //    reject(error);
      // })

   });

   static checkPermissionCallback = (callBack: () => void, permission?: EnumPermissoes | any, operacao?: EnumOperacaoPermissao, observacao?: string) => new Promise<boolean>((resolve, reject) => {

      if (!permission) {
         callBack();
         resolve(true);
         return;
      }

      // let controller = new ControllerUsuario();
      // controller.ValidarPermissaoUsuario(permission, operacao, observacao).then(data => {
      //    callBack();
      //    resolve(true);
      // }).catch(error => {
      //    console.log(error);
      //    reject(error);
      // })

   });

}
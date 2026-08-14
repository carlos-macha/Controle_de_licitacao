import React, { Fragment, useEffect, useState } from 'react';
import { DataRoutesAlterarSenha, DataRoutesHome } from '../../routes/dataroutes';
import ViewLogin from './viewlogin';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { storageSetWSHost, storageSetWSTimeout } from '../../utils/storage';
import ControllerUsuario from '../../controllers/controllerusuario';
import { IModelLogin } from '../../models/modelLogin';
import { ValidateFields } from '../../base/components/form/form';
import ConfigIni, { IConfigIniProps, IConfigProps } from '../../base/services/configini';
import { SENHA_PADRAO } from '../const/const';
import { useSweetAlertContext } from '../../base/hooks/useSweetAlertContext';

const Login: React.FC = () => {

   const { authState, authDispatch } = useAuthContext();
   const [user, setUser] = useState<string>(authState.remindMe ? authState.user.LOGIN : '');
   const [pass, setPass] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);
   const [logged, setLogged] = useState<boolean>(false);
   const [remindMe, setRemindMe] = useState<boolean>(authState.remindMe!);
   const [error, setError] = useState<string | undefined>(undefined);
   const [resetPass, setResetPass] = useState<boolean>(false);
   const [validateFields] = useState<ValidateFields>(new ValidateFields());
   const { sweetAlertdispatch } = useSweetAlertContext();
   // const [data, setData] = useState<IModelLogin | undefined>();

   useEffect(() => {
      ConfigIni.getInstance().iniFactory<IConfigIniProps>('CONTROLDOC').then(cfg => {
         storageSetWSHost(cfg.WSCommandBaseUrl);
         storageSetWSTimeout(cfg.WSCommandTimeOut);
      })
   }, []);

   const onLogin = (): void => {

      if (!validateFields.validateAll())
         return;

      let controllerUsuario = new ControllerUsuario();

      setLoading(true);

      controllerUsuario.Login(user, pass).then(data => {

         if (pass === SENHA_PADRAO) {

            sweetAlertdispatch({
               type: 'show',
               props: {
                  warning: true,
                  showCancel: true,
                  confirmBtnText: "Sim, confirmo!",
                  cancelBtnText: "Cancelar!",
                  confirmBtnBsStyle: 'primary',
                  title: "Deseja alterar sua senha agora?",
                  onConfirm: () => {
                     authDispatch({
                        type: 'login',
                        remindMe: remindMe,
                        user: data.usuario,
                        token: data.token
                     });
                     setResetPass(true);
                     sweetAlertdispatch({ type: 'close' });
                  },
                  onCancel: () => {
                     sweetAlertdispatch({ type: 'close' });
                  },
                  focusCancelBtn: true
               },
               msg: <Fragment>Olá <b>{user}</b> Sua senha foi resetada. Para acessar o Controldoc será necessário redefinir sua senha.</Fragment>
            })
            return;
         }

         authDispatch({
            type: 'login',
            remindMe: remindMe,
            user: data.usuario,
            token: data.token
         });

         setLogged(true);
         setError(undefined);
         // setData(data);
      }).catch(error => {
         setLogged(false);
         setError(typeof error === "string" ? error : "Erro ao realizar logins.");
         setResetPass(false);
         // setData(undefined);
      }).finally(() => {
         setLoading(false);
      })
   }

   const onCloseAlert = () => {
      setError(undefined);
   }

   return (
      <Fragment>
         <ViewLogin
            onLogin={onLogin}
            user={{ data: user, setData: setUser }}
            pass={{ data: pass, setData: setPass }}
            remindMe={{ data: remindMe, setData: setRemindMe }}
            loading={loading}
            errorLogin={error}
            onCloseAlert={onCloseAlert}
            validateFields={validateFields}
         />
         {logged && (<Navigate to={DataRoutesHome.path} />)}
         {/* {resetPass && (<Navigate to={DataRoutesAlterarSenha.path.replace(':id', String(data?.ID_CONTATO))} />)} */}
         {resetPass && (<Navigate to={DataRoutesAlterarSenha.path} />)}
      </Fragment>
   );
}

export default Login;
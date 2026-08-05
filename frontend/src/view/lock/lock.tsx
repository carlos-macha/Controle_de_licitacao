import React, { useState, Fragment, useEffect } from 'react';
import { DataRoutesHome } from '../../routes/dataroutes';
import ViewLock from './viewlock';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { AlertTypes } from '../../base/components/alert/alert';
import ControllerUsuario from '../../controllers/controllerusuario';
import ConfigIni, { IConfigIniProps } from '../../base/services/configini';
import { storageSetWSHost, storageSetWSTimeout } from '../../utils/storage';

const Lock: React.FC = () => {

   const { authState, authDispatch: dispatch } = useAuthContext();

   const [loading, setLoading] = useState<boolean>(false);
   const [pass, setPass] = useState<string>('');
   const [redirectHome, setRedirectHome] = useState<boolean>(false);
   const [alertMessage, setAlertMessage] = useState<string | undefined>();
   const [alertType, setAlertType] = useState<AlertTypes>();

   useEffect(() => {
      ConfigIni.getInstance()
         .iniFactory<IConfigIniProps>('CONTROLDOC')
         .then(cfg => {
            storageSetWSHost(cfg.WSCommandBaseUrl);
            storageSetWSTimeout(cfg.WSCommandTimeOut);
         });
   }, []);

   const onValidatePass = (): void => {

      if (loading)
         return;

      const controllerUsuario = new ControllerUsuario();

      setLoading(true);

      controllerUsuario.Unlock(pass)
         .then(data => {
            console.log("RETORNO UNLOCK:", data);

            if (data.UNLOCKED) {

               dispatch({
                  type: "unlock"
               });

               setRedirectHome(true);
            }

         })
         .catch(error => {

            setAlertType("danger");
            setAlertMessage(
               typeof error === "string"
                  ? error
                  : "Senha inválida"
            );

            setRedirectHome(false);

         })
         .finally(() => {
            setLoading(false);
         });
   };

   const onCloseAlert = (): void => {
      setAlertType(undefined);
      setAlertMessage(undefined);
   };

   const onLogin = (): void => {

      dispatch({
         type: "logoff"
      });

      setRedirectHome(true);
   };

   return (
      <Fragment>

         <ViewLock
            user={authState.user?.NOME ?? ''}
            pass={{
               data: pass,
               setData: setPass
            }}
            onValidatePass={onValidatePass}
            onCloseAlert={onCloseAlert}
            onLogin={onLogin}
            alertMessage={alertMessage}
            alertType={alertType}
            loading={loading}
         />

         {redirectHome && (
            <Navigate to={DataRoutesHome.path} />
         )}

      </Fragment>
   );
};

export default Lock;
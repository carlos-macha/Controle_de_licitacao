import React, { useEffect } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { DataRoutesHome } from '../../../routes/dataroutes';
import TemplateNavbar from '../../../base/template/navbar/navbar';
import { useMenuContext } from '../../../base/menu/hooks/useMenuContext';
import { storageGetDark, storageSetDark } from '../../../utils/storage';
import ControllerUsuario from '../../../controllers/controllerusuario';

interface NavbarControllerProps { }

const Navbar: React.FC<NavbarControllerProps> = () => {
   const { itemMenu, dispatch } = useMenuContext();
   const { authState, authDispatch } = useAuthContext();

   const onToggleDarkLigth = () => {
      let isDark: boolean = storageGetDark();

      authDispatch({
         type: 'tema',
         isDark: !isDark
      });

      if (isDark) {
         storageSetDark(false);
      } else {
         storageSetDark(true);
      }
   }

   const onClickPerfil = () => {
      dispatch({
         type: 'open',
         name: 'meucadastro',
         title: 'Meu Cadastro'
      });
   }

   const optionsDropdownNavbar = authState.user.PERFIL === 'ADMIN'
      ? [
         {
            iconCss: 'mdi mdi-shield-account',
            title: 'Administração',
            description: 'Acessar área administrativa',
            onClick: () => {
               dispatch({
                  type: 'open',
                  name: 'administracao',
                  title: 'Administração'
               });
            }
         }
      ]
      : [];

   const onClickSair = () => {
      new ControllerUsuario().DAO.logout()
         .catch(() => {
            // mesmo se falhar a chamada ao backend, desloga localmente
         })
         .finally(() => {
            authDispatch({
               type: 'logoff'
            });
         });
   }

   const onClickBloquear = () => {
      authDispatch({
         type: 'lock'
      });
   }

   return (
      <TemplateNavbar
         onToggleDarkLigth={onToggleDarkLigth}
         menuTitle={itemMenu.title}
         name={authState.user.NOME!}
         user={authState.user.LOGIN}
         onClickPerfil={onClickPerfil}
         onClickSair={onClickSair}
         onClickBloquear={onClickBloquear}
         // imgLogo=''
         // imgNameApp=''
         pathHome={DataRoutesHome.path}
         isDark={authState.isDark}
         optionsDropdownNavbar={optionsDropdownNavbar}
      />
   );
}

export default Navbar;
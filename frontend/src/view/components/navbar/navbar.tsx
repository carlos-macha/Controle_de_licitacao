import React, { Fragment, useEffect } from 'react';
import * as XLSX from 'xlsx';
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

   const onImportarExcel = () => {
      document.getElementById('input-importar-excel')?.click();
   }

   const onArquivoExcelSelecionado = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const arquivo = e.target.files?.[0];

      if (!arquivo) {
         return;
      }


      const buffer = await arquivo.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const dados = XLSX.utils.sheet_to_json(sheet);

      console.log(dados);
   }

   return (
      <Fragment>
         <input
            id="input-importar-excel"
            type="file"
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
            onChange={onArquivoExcelSelecionado}
         />

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
            optionsNavbar={[
               <li key="importar-excel">
                  <a
                     href="#"
                     className="search-toggle iq-waves-effect"
                     onClick={(e) => {
                        e.preventDefault();
                        onImportarExcel();
                     }}
                  >
                     <i className="mdi mdi-file-excel"></i>
                  </a>
               </li>
            ]}
         />
      </Fragment>
   );
}

export default Navbar;
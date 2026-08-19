import React, { Fragment } from 'react';
import * as XLSX from 'xlsx';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { DataRoutesHome } from '../../../routes/dataroutes';
import TemplateNavbar from '../../../base/template/navbar/navbar';
import { useMenuContext } from '../../../base/menu/hooks/useMenuContext';
import { storageGetDark, storageSetDark } from '../../../utils/storage';
import ControllerUsuario from '../../../controllers/controllerusuario';
import ControllerImportacao from '../../../controllers/controllerimportacao';
import { IModelImportacaoLicitacao } from '../../../models/modelImportacaoLicitacao';
import { useSweetAlertContext } from '../../../base/hooks/useSweetAlertContext';

interface NavbarControllerProps { }

const Navbar: React.FC = () => {
   const { itemMenu, dispatch } = useMenuContext();
   const { authState, authDispatch } = useAuthContext();
   const { sweetAlertdispatch } = useSweetAlertContext();

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
   };

   const onClickPerfil = () => {
      dispatch({
         type: 'open',
         name: 'meucadastro',
         title: 'Meu Cadastro'
      });
   };

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
         })
         .finally(() => {
            authDispatch({
               type: 'logoff'
            });
         });
   };

   const onClickBloquear = () => {
      authDispatch({
         type: 'lock'
      });
   };

   const onImportarExcel = () => {
      document.getElementById('input-importar-excel')?.click();
   };

   const onArquivoExcelSelecionado = async (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const arquivo = e.target.files?.[0];

      if (!arquivo) {
         return;
      }

      const buffer = await arquivo.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const dados =
         XLSX.utils.sheet_to_json<IModelImportacaoLicitacao>(
            sheet
         );

      try {

         const controller = new ControllerImportacao();

         await controller.Importar(dados);

         console.log('Importação realizada com sucesso.');

         sweetAlertdispatch({
            type: "show",
            props: {
               title: "Sucesso",
               type: "success",
               onConfirm: () => {
                  sweetAlertdispatch({ type: "close" });
               }
            },
            msg: "Arquivo importado com sucesso."
         });

      } catch (error: any) {
         sweetAlertdispatch({
            type: "show",
            props: {
               title: "Erro",
               type: "error",
               onConfirm: () => {
                  sweetAlertdispatch({ type: "close" });
               }
            },
            msg: error.response?.data?.error ?? "Erro ao importar arquivo."
         });
      }

      e.target.value = '';
   };

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
};

export default Navbar;
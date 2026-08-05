import React, { Fragment } from 'react';
import { MenuName } from '../menu/menu';
import TemplateTabPage from '../../../base/template/tabPage/tabpage';
import MeuPerfil from '../../meuperfil/meuperfil';
import Produtos from '../../produtos/produtos';

interface TabPageProps { };

const TabPage: React.FC<TabPageProps> = (props) => {

   const renderPage = (name: MenuName): JSX.Element => {

      let el: JSX.Element = <Fragment />

      switch (name) {
         case "produtos":
            el = <Produtos/>
            break;
            
         case "meucadastro":
            el = <MeuPerfil />;
            break;

         default:
            el = <div> {name} </div>;
            break;
      }

      return el;
   }

   return (
      <TemplateTabPage
         renderPage={renderPage}
      />
   );

}

export default TabPage;
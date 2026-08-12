import React, { Fragment } from 'react';
import { MenuName } from '../menu/menu';
import TemplateTabPage from '../../../base/template/tabPage/tabpage';
import MeuPerfil from '../../meuperfil/meuperfil';
import Produtos from '../../produtos/produtos';
import Licitacao from '../../licitacao/licitacao';
import Concorrentes from '../../concorrentes/concorrentes';
import LicitacaoProduto from '../../licitacaoProduto/licitacaoProduto';
import ResultadoLicitacao from '../../resultadoLicitacao/resultadoLicitacao';
import Administracao from '../../administracao/administracao';

interface TabPageProps { };

const TabPage: React.FC<TabPageProps> = (props) => {

   const renderPage = (name: MenuName): JSX.Element => {

      let el: JSX.Element = <Fragment />

      switch (name) {
         case "resultadoslicitacao":
            el = <ResultadoLicitacao/>
            break;

         case "produtos":
            el = <Produtos/>
            break;

         case "licitacoes":
            el = <Licitacao/>
            break;

         case "concorrentes":
            el = <Concorrentes/>
            break;

         case "produtoslicitacao":
            el = <LicitacaoProduto/>
            break;
            
         case "meucadastro":
            el = <MeuPerfil />;
            break;

         case "administracao":
            el = <Administracao />;
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
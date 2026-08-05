import React, { Fragment } from 'react';
import './errorpage.css';
import { utilities } from '../../../base/utils/utilities';
import Button from '../../components/form/form';

export declare type ErrorPageType = 401 | 403 | 404 | 500;
export declare type ErrorPageModel = 1 | 2;

export interface TemplateErrorPageProps {
   errorType: ErrorPageType,
   message?: string | JSX.Element,
   pageModel?: ErrorPageModel,
   onBtnClick?: () => void
}

export const TemplateErrorPage: React.FC<TemplateErrorPageProps> = (props) => {

   const { errorType, pageModel, onBtnClick } = props;
   var { message } = props;

   let messageType: string = '';
   let description: string | JSX.Element = '';

   switch (errorType) {
      case 401:
         messageType = 'Oops! Acesso bloqueado.';
         break;

      case 403:
         messageType = 'Oops! Página com acesso restrito.';
         description = 'Não foi possível acessar a página referente à opção que você selecionou. Enquanto isso, você pode acessar outras páginas ou tentar entrar em contato com o administrador do sistema. '
         break;

      case 404:
         messageType = 'Oops! Página não encontrada.';
         break;

      default:
         messageType = 'Oops! Algo deu errado.';
         break;
   }

   if (!message)
      message = description;

   let page: JSX.Element = <Fragment />

   switch (pageModel) {
      case 2:
         page = <div className="wrapper">
            <div className="container-fluid p-0">
               <div className="row no-gutters">
                  <div className="col-sm-12 text-center container-text-404">
                     <div className="iq-error">
                        <h1>{errorType}</h1>
                        <h4 className="mb-0">{messageType}</h4>
                        {message}
                        <img src={`${utilities.baseURL()}images/error/01.png`} className="img-fluid" alt="" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         break;

      default:
         page = <div className="wrapper">
            <div className="container-fluid p-0">
               <div className="row no-gutters">
                  <div className="col-12 col-lg-6 container-text-403">
                     <div className="iq-custom-error">
                        <h1>{errorType}</h1>
                        <h4 className="mb-0">{messageType}</h4>
                        {message}
                     </div>
                  </div>
                  <div className='col-12 col-lg-6 container-img-403'>
                     <img src={`${utilities.baseURL()}images/error/403.webp`} className="img-403" />
                  </div>
               </div>
            </div>
         </div>;
         break;
   }

   return (
      <Fragment>
         {page}
      </Fragment>
   );
}

TemplateErrorPage.defaultProps = {
   pageModel: 1
}


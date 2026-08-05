import React, { Fragment } from 'react';
import { TemplateErrorPage, TemplateErrorPageProps } from './errorpage';
import Button from '../../components/form/form';
import { Link, Navigate } from 'react-router-dom';

interface Error404Props extends Omit<TemplateErrorPageProps, 'errorType'> {
   linkHome?: string
}

const TemplateError404: React.FC<Error404Props> = (props) => {
   const { message, pageModel, linkHome } = props;

   let _message: JSX.Element = <Fragment>
      <p>{message}</p>
      {linkHome && <Link to={linkHome} className="btn btn-primary btn-lg">Ir para página principal</Link>}
   </Fragment>;

   return (
      <TemplateErrorPage
         errorType={404}
         pageModel={pageModel}
         message={_message}
      />
   );
}

export default TemplateError404;
import React, { Fragment, useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { ErrorPageType, TemplateErrorPage } from '../../../base/template/errorpage/errorpage';
import Spinners from '../../components/spinners/spinners';
import './pagebase.css';
import Button from '../../components/form/form';

interface IValidPermission {
  hasPermission: boolean,
  message?: string | JSX.Element,
  errorCode?: ErrorPageType
}

export interface TemplatePageBaseProps {
  permission?: any,
  checkPermission?: (permission?: number | string) => Promise<boolean>,
  errorCode?: (errorMessage: string) => ErrorPageType
}

const TemplatePageBase: React.FC<TemplatePageBaseProps> = (props) => {
  const { permission, checkPermission, errorCode, children } = props;
  // const [showPage, setShowPage] = useState<boolean>(false);
  const [loadingPermission, setLoadingPermission] = useState<boolean>(false);
  const [erroPermissao, setErroPermissao] = useState<boolean>(false); // novo

  const [validPermission, setValidPermission] = useState<IValidPermission>({
    hasPermission: false
  });

  const verificarPermissao = () => {
    if (!checkPermission) {
      setValidPermission({ hasPermission: true });
      return;
    }

    setErroPermissao(false);
    setLoadingPermission(true);

    checkPermission(permission).then(() => {
      setValidPermission({ hasPermission: true })
    }).catch(error => {
      setErroPermissao(true);
      setValidPermission({
        hasPermission: false,
        errorCode: errorCode ? errorCode(error) : 403,
        message: <span>{HTMLReactParser(error.replace(/(\r\n|\n|\r)/gm, "<br>"))}</span>
      })
    }).finally(() => {
      setLoadingPermission(false);
    })
  }

  useEffect(() => {
    verificarPermissao();
  }, [])

  // if (!showPage)
  //    return (
  //       <Fragment />
  //    );

  if (loadingPermission) {
    return (
      <>
        <div className='d-flex flex column justify-content-center h-100 align-items-center flex-column'>
          <Spinners
            className='m-5'
            size={60}
            loading={loadingPermission}
          />
          <div className='d-flex justify-content-center '>
            <strong>
              Carregando permissões...
            </strong>
          </div>
        </div>
      </>
    )
  }

  if (erroPermissao) {
    return (
      <div className='d-flex flex-column justify-content-center h-75 align-items-center'>
        <strong className='mb-3'>Não foi possível verificar a permissão.</strong>
        <Button className='btn btn-primary' onClick={verificarPermissao}>
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <Fragment>
      {validPermission.hasPermission ? children : <TemplateErrorPage errorType={validPermission.errorCode!} message={validPermission.message} />}
    </Fragment>
  );
}

export default TemplatePageBase;

export interface PageBaseProps extends Omit<TemplatePageBaseProps, 'errorCode'> {
  permission?: any,
  checkPermission?: (permission?: number | string) => Promise<boolean>
}

export const PageBase: React.FC<PageBaseProps> = (props) => {
  const { children, ...attributes } = props;

  return (
    <TemplatePageBase
      {...attributes}
    >
      {children}
    </TemplatePageBase>
  );
}
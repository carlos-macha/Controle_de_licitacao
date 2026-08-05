import React, { Fragment, useState } from 'react';
import Button, { Input, InputNumber, ValidateFields } from '../form/form';
import { utilities } from '../../utils/utilities';
import { CustomSweetAlertProps } from '../../types/types';
import SweetAlert from 'react-bootstrap-sweetalert';
import HTMLReactParser from 'html-react-parser';

interface SenhaAutorizacao {
   validateSenhaAutorizacao?: ValidateFields,
   onValidate: (validated: boolean) => void
}

const SenhaAutorizacao: React.FC<SenhaAutorizacao> = (props) => {
   const { validateSenhaAutorizacao, onValidate } = props;
   const [codigoAutorizacao] = useState<string>(utilities.gerarCodigoAutorizacao());
   const [senhaAuth, setSenhaAuth] = useState<string>('');
   const [sweetAlertProps, setSweetAlertProps] = useState<CustomSweetAlertProps | undefined>();

   const onValidarSenhaAuth = (): boolean => {
      if (validateSenhaAutorizacao && !validateSenhaAutorizacao.validateAll())
         return false;

      if (senhaAuth === '') {
         setSweetAlertProps({
            props: {
               title: 'Senha não informada!',
               type: 'error',
               onConfirm(response) {
                  setSweetAlertProps(undefined);
               }
            },
            msg: `Informe um senha gerada pelo código de autorização ${codigoAutorizacao}`
         })
         return false;
      }

      let senhaComparacao = utilities.gerarSenhaAutorizacao(codigoAutorizacao);

      if (senhaAuth === senhaComparacao)
         return true;

      setSweetAlertProps({
         props: {
            title: 'Senha inválida!',
            type: 'error',
            onConfirm(response) {
               setSweetAlertProps(undefined);
            }
         },
         msg: `A senha informda não confere com o código de autorização ${codigoAutorizacao}`
      })

      return false;
   }

   const onBtnVerificar = (): void => {
      onValidate(onValidarSenhaAuth());
   }

   return (
      <Fragment>
         <div className="form-card text-left">
            <div className="row">
               <div className="col-12">
                  <h3 className="mb-2">Informe a senha de autorização do Callcenter</h3>
               </div>
            </div>
            <div className="row">
               <div className="col-6 mb-3">
                  <InputNumber
                     id='CODIGO_AUT'
                     format='###.###.###'
                     value={codigoAutorizacao}
                     label="Código"
                     readOnly
                  />
               </div>
               <div className="col-6 mb-3">
                  <label htmlFor="SENHA_AUTH">Senha</label>
                  <Input
                     id="SENHA_AUTH"
                     value={senhaAuth}
                     classNameGroup='input-group'
                     onChange={(e) => { setSenhaAuth(e.target.value) }}
                     validator={validateSenhaAutorizacao}
                     validations={{
                        required: true,
                     }}
                  >
                     <Button
                        className="btn btn-primary float-right action-button"
                        caption='Verificar'
                        onClick={onBtnVerificar}
                     />
                  </Input>
               </div>
            </div>
            <div className="row">
               <div className="col-12">

               </div>
            </div>
         </div>
         {sweetAlertProps &&
            <SweetAlert
               {...sweetAlertProps.props}
            >
               <span>
                  {
                     typeof sweetAlertProps.msg === 'string' ?
                        HTMLReactParser(sweetAlertProps.msg.replace(/(\r\n|\n|\r)/gm, "<br>")) :
                        sweetAlertProps.msg
                  }
               </span>
            </SweetAlert>
         }
      </Fragment>
   );
}

export default SenhaAutorizacao;
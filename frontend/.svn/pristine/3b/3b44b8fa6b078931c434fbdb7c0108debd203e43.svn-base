import React from 'react';
import ContainerPageAuth from '../components/containerpageauth/containerpageauth';
import { InputDataValue } from '../../base/types/types';
import Button, { EnumCharcasetypes, Input, InputCheckbox, InputPassWord, ValidateFields } from '../../base/components/form/form';
import Alert from '../../base/components/alert/alert';

interface ViewLoginProps {
   user: InputDataValue<string>,
   pass: InputDataValue<string>,
   remindMe: InputDataValue<boolean>,
   loading: boolean,
   onLogin: () => void,
   errorLogin?: string,
   onCloseAlert?: () => void,
   validateFields: ValidateFields
}

const ViewLogin: React.FC<ViewLoginProps> = (props) => {

   const { pass, user, onLogin, remindMe, errorLogin, onCloseAlert, loading, validateFields } = props;

   return (
      <ContainerPageAuth>
         <div className="sign-in-from">
            <h1 className="mb-0">Login</h1>
            <p>Digite seu usuário e senha para acessar o Controldoc.</p>
            <form className="mt-4">
               <div className="mb-3">
                  <Input
                     label='Usuário'
                     placeholder="Informe seu Usuário"
                     charCase={EnumCharcasetypes.UPPERCASE}
                     dataValue={user}
                     onClick={onCloseAlert}
                     id="usuario"
                     validator={validateFields}
                     validations={{
                        required: true
                     }}
                  />
               </div>
               <div className="mb-3">
                  <label htmlFor="userpassword">Senha</label>
                  {/* <div className="float-right">
                     <Link to={DataRoutesAlterarSenha.path}>{DataRoutesAlterarSenha.name}</Link>
                  </div> */}
                  <InputPassWord
                     placeholder='Informe sua Senha'
                     viewPass
                     dataValue={pass}
                     onClick={onCloseAlert}
                     id="senha"
                     validator={validateFields}
                     validations={{
                        required: true,
                     }}
                  />
               </div>
               <div className="d-inline-block w-100">
                  <InputCheckbox
                     className='custom-control-input'
                     classNameGroup='custom-control custom-checkbox d-inline-block mt-2 pt-1'
                     classNameLabel='custom-control-label'
                     label='Lembra-me'
                     id="remember-check"
                     dataValue={remindMe}
                  />

                  <Button
                     className="btn btn-primary float-right"
                     caption='Login'
                     onClick={onLogin}
                     loading={loading}
                  />
               </div>
               <div>
                  {errorLogin &&
                     <Alert
                        type="danger"
                        title="Atenção"
                        message={errorLogin}
                        onClickClose={onCloseAlert}
                     />
                  }
               </div>
               {/* <div className="sign-info">
                  <span className="dark-color d-inline-block line-height-2">Não tem uma conta? <Link to={DataRoutesNovaConta.path}>{DataRoutesNovaConta.name}</Link></span>
                  <Link to={DataRoutesNovoLogin.path} className="float-right">{DataRoutesNovoLogin.name}</Link>
               </div> */}
            </form>
         </div>
      </ContainerPageAuth>
   )
}

export default ViewLogin;
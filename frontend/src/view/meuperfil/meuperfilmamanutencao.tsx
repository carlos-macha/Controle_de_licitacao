import React, { Fragment, useEffect, useState } from 'react';
import CrudManutencao, { ManutencaoProps } from '../../base/components/crud/manutencao/crudmanutencao';
import { InputDataValue } from '../../base/types/types';
import { CrudManutencaoEvents } from '../../base/components/crud/types';
//import { IModelDoc001 } from '../../base/2/modeldoc001';
import Card, { CardBody, CardFooter, CardHeader, CardTools } from '../../base/components/card/card';
import Tabs, { TabContent, TabItem, TabPanel } from '../../base/components/tab/tab';
import Button, { EnumCharcasetypes, Input, InputDateTime, InputPassWord, ValidateFields } from '../../base/components/form/form';
import ControllerUsuario from '../../controllers/controllerusuario';
import { useAuthContext } from '../../hooks/useAuthContext';
import { EnumCrudStateRecordType } from '../../base/components/crud/enums';
import { useSweetAlertContext } from '../../base/hooks/useSweetAlertContext';
import { IModelUsuario } from '../../models/modelUsuario';
import moment from 'moment';

interface MeuPerfilManutencaoProps extends ManutencaoProps { }

const MeuPerfilManutencao: React.FC<MeuPerfilManutencaoProps> = (props) => {
   const { events } = props;
   const [eventsManuntencao, setEventsManutencao] = useState<CrudManutencaoEvents | undefined>();
   const { authState, authDispatch } = useAuthContext()
   const { sweetAlertdispatch } = useSweetAlertContext();
   const [foto, setFoto] = useState<string>();
   const [validateSenhas] = useState<ValidateFields>(new ValidateFields());
   const [senhaAtual, setSenhaAtual] = useState<string>('');
   const [senhaNova, setSenhaNova] = useState<string>('');
   const [senhaConfirmacao, setSenhaConfirmacao] = useState<string>('');
   const [loadingAlterarSenha, setLoadingAlterarSenha] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   var dataModel: InputDataValue<IModelUsuario>;



   useEffect(() => {
      const e = events;

      if (!e) return;

      const controller = new ControllerUsuario();

      controller.DAO.GetPerfil()
         .then(data => {

            const dataForm = {
               ...data,
               DATA_CADASTRO: data.DATA_CADASTRO
                  ? moment(data.DATA_CADASTRO).format("DD/MM/YYYY")
                  : null,

               DATA_ALTERACAO: data.DATA_ALTERACAO
                  ? moment(data.DATA_ALTERACAO).format("DD/MM/YYYY")
                  : null
            };

            e.data = dataForm;
            e.state = EnumCrudStateRecordType.ALTERAR;

            setEventsManutencao(e);

         })
         .finally(() => setLoading(false));

   }, []);

   const afterSave = (user: IModelUsuario) => {
      let authUser = { ...authState.user };
      authUser.NOME = user.NOME;
      authDispatch({
         type: 'profile',
         user: authUser
      });
   }

   const onSalvar = async () => {
      const controller = new ControllerUsuario();

      try {
         const usuario = await controller.DAO.AtualizarNome({
            NOME: dataModel.data.NOME
         });

         afterSave(usuario);

         sweetAlertdispatch({
            type: "show",
            props: {
               title: "Sucesso",
               type: "success",
               onConfirm: () => sweetAlertdispatch({ type: "close" })
            },
            msg: "Nome atualizado com sucesso."
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
            msg: error.response?.data?.error?.message ?? "Erro ao alterar o nome."
         });

      }
   };

   const onAlterarSenha = async () => {
      if (!validateSenhas.validateAll())
         return;

      if (senhaNova !== senhaConfirmacao) {
         validateSenhas.setErrorMessage(
            'PERFIL_USU_SENHA',
            'As senhas não conferem'
         );

         validateSenhas.setErrorMessage(
            'PERFIL_USU_SENHA_CONFIRMACAO',
            'As senhas não conferem'
         );

         return;
      }

      try {

         setLoadingAlterarSenha(true);
         const controller = new ControllerUsuario();

         await controller.DAO.AtualizarSenha({

            SENHA_ATUAL: senhaAtual,

            NOVA_SENHA: senhaNova

         });

         sweetAlertdispatch({
            type: "show",
            props: {
               title: "Sucesso",
               type: "success",
               onConfirm: () => {
                  sweetAlertdispatch({ type: "close" });
               }
            },
            msg: "Senha alterada com sucesso."
         });

         setSenhaAtual('');
         setSenhaNova('');
         setSenhaConfirmacao('');

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
            msg: error.response?.data?.error?.message ?? "Erro ao alterar senha."
         });

      } finally {

         setLoadingAlterarSenha(false);

      }
   };


   return (
      <CrudManutencao
         loading={loading}
         showMessageSuccessOnSave
         layout='customized'
         events={eventsManuntencao}
         onBody={(params) => {
            dataModel = params.dataModel;

            if (!dataModel.data)
               return (<></>);

            return (
               <Fragment>
                  <div className="row">
                     <div className="col-lg-12">
                        <Card className="iq-card">
                           <CardBody className="iq-card-body p-0">
                              <div className="iq-edit-list">
                                 <Tabs className="iq-edit-profile d-flex nav nav-pills">
                                    <TabItem
                                       className="col-md-6 p-0"
                                       classNameLink="nav-link"
                                       tabPanelRef='personal-information'
                                       selected
                                    >
                                       Informações Pessoais
                                    </TabItem>
                                    <TabItem
                                       className="col-md-6 p-0"
                                       classNameLink="nav-link"
                                       tabPanelRef='chang-pwd'
                                    >
                                       Alterar Senha
                                    </TabItem>
                                 </Tabs>
                              </div>
                           </CardBody>
                        </Card>
                     </div>
                     <div className="col-lg-12">
                        <div className="iq-edit-list-data">
                           <TabContent className="tab-content">
                              <TabPanel className="tab-pane fade" show id="personal-information">
                                 <Card className='iq-card'>
                                    <CardHeader className='iq-card-header d-flex justify-content-between'>
                                       <div className="iq-header-title">
                                          <h4 className="card-title">Informações Pessoais</h4>
                                       </div>
                                       {/* <CardTools>teste</CardTools> */}
                                    </CardHeader>
                                    <CardBody className='iq-card-body'>
                                       <div className="form-group row align-items-center">
                                          <div className="col-md-12">
                                             <div className="profile-img-edit">
                                                {foto ?
                                                   <img
                                                      className="profile-pic"
                                                      // src="images/user/10.jpg"
                                                      src={`data:image/png;base64,${foto}`}
                                                      alt="profile-pic"
                                                      width={150}
                                                      height={150}
                                                      style={{
                                                         objectFit: 'cover',
                                                         objectPosition: 'center'
                                                      }}
                                                   />
                                                   :
                                                   <i className="mdi mdi-account-circle"
                                                      style={{
                                                         fontSize: '1175%',
                                                         lineHeight: 0,
                                                         top: 75,
                                                         position: 'relative',
                                                         marginBottom: 200

                                                      }}
                                                   />
                                                }
                                             </div>
                                          </div>
                                       </div>
                                       <div className="row align-items-center">
                                          <div className="col-12 col-md-3 col-lg-2 mb-3">
                                             <Input
                                                label="Usuário"
                                                charCase={EnumCharcasetypes.UPPERCASE}
                                                dataModel={dataModel}
                                                id="LOGIN"
                                                readOnly
                                             />
                                          </div>
                                          <div className="col-12 col-md-3 col-lg-2 mb-3">
                                             <InputDateTime
                                                type='date'
                                                label="Data de Cadastro"
                                                dataModel={dataModel}
                                                id="DATA_CADASTRO"
                                                readOnly
                                             />
                                          </div>
                                          <div className="col-12 col-md-3 col-lg-2 mb-3">
                                             <InputDateTime
                                                type='date'
                                                label="Data de Alteração"
                                                dataModel={dataModel}
                                                id="DATA_ALTERACAO"
                                                readOnly
                                             />
                                          </div>
                                       </div>
                                       <div className="row">
                                          <div className="col-12 col-md-9 col-lg-6 mb-3">
                                             <Input
                                                label="Nome"
                                                dataModel={dataModel}
                                                id="NOME"
                                                charCase={EnumCharcasetypes.UPPERCASE}
                                                validator={params.validateFields}
                                                validations={{
                                                   required: true
                                                }}
                                             />
                                          </div>
                                       </div>
                                    </CardBody>
                                    <CardFooter>
                                       <Button
                                          loading={params.spinnerSave}
                                          showCaptionButtonOnLoading
                                          caption='Gravar'
                                          onClick={onSalvar}
                                          classIcon="mdi mdi-check-bold"
                                       />
                                    </CardFooter>
                                 </Card>
                              </TabPanel>
                              <TabPanel className="tab-pane fade" id="chang-pwd">
                                 <Card className='iq-card'>
                                    <CardHeader className='iq-card-header d-flex justify-content-between'>
                                       <div className="iq-header-title">
                                          <h4 className="card-title">Alterar Senha</h4>
                                       </div>
                                    </CardHeader>
                                    <CardBody>
                                       <div className='row'>
                                          <div className='col-12 mb-3'>
                                             <label htmlFor="PERFIL_USU_SENHA_ATUAL">Senha Atual</label>
                                             <InputPassWord
                                                viewPass
                                                value={senhaAtual}
                                                onChange={(e) => {
                                                   setSenhaAtual(e.target.value)
                                                }}
                                                id="PERFIL_USU_SENHA_ATUAL"
                                                autoComplete="new-password"
                                                validator={validateSenhas}
                                                validations={{
                                                   required: true
                                                }}
                                             />
                                          </div>
                                          <div className='col-12 mb-3'>
                                             <label htmlFor="PERFIL_USU_SENHA">Nova Senha</label>
                                             <InputPassWord
                                                viewPass
                                                value={senhaNova}
                                                onChange={(e) => {
                                                   setSenhaNova(e.target.value)
                                                }}
                                                id="PERFIL_USU_SENHA"
                                                validator={validateSenhas}
                                                validations={{
                                                   required: true
                                                }}
                                             />
                                          </div>
                                          <div className='col-12 mb-3'>
                                             <label htmlFor="PERFIL_USU_SENHA_CONFIRMACAO">Confirme a Senha</label>
                                             <InputPassWord
                                                viewPass
                                                value={senhaConfirmacao}
                                                onChange={(e) => {
                                                   setSenhaConfirmacao(e.target.value)
                                                }}
                                                id="PERFIL_USU_SENHA_CONFIRMACAO"
                                                validator={validateSenhas}
                                                validations={{
                                                   required: true
                                                }}
                                             />
                                          </div>
                                       </div>
                                    </CardBody>
                                    <CardFooter>
                                       <Button
                                          showCaptionButtonOnLoading
                                          loading={loadingAlterarSenha}
                                          caption='Gravar'
                                          onClick={onAlterarSenha}
                                          classIcon="mdi mdi-check-bold"
                                       />
                                    </CardFooter>
                                 </Card>
                              </TabPanel>
                           </TabContent>
                        </div>
                     </div>
                  </div>
               </Fragment>
            )
         }}
         afterSave={afterSave}
      />
   );
}

export default MeuPerfilManutencao;
import React, { Fragment, useEffect, useState } from 'react';
import CrudManutencao, { ManutencaoProps } from '../../base/components/crud/manutencao/crudmanutencao';
import { InputDataValue } from '../../base/types/types';
import { CrudManutencaoEvents } from '../../base/components/crud/types';
import { IModelDoc001 } from '../../base/2/modeldoc001';
import Card, { CardBody, CardFooter, CardHeader, CardTools } from '../../base/components/card/card';
import Tabs, { TabContent, TabItem, TabPanel } from '../../base/components/tab/tab';
import Button, { EnumCharcasetypes, Input, InputDateTime, InputPassWord, ValidateFields } from '../../base/components/form/form';
import ControllerUsuario from '../../controllers/controllerusuario';
import { useAuthContext } from '../../hooks/useAuthContext';
import { EnumCrudStateRecordType } from '../../base/components/crud/enums';
import { useDropzone } from 'react-dropzone'
import { utilities } from '../../base/utils/utilities';
import { useSweetAlertContext } from '../../base/hooks/useSweetAlertContext';
import md5 from 'md5';

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
   var dataModel: InputDataValue<IModelDoc001>;

   const { getRootProps, getInputProps, open, acceptedFiles, fileRejections } = useDropzone({
      noClick: true,
      noKeyboard: true,
      multiple: false,
      maxSize: 5000000,
      accept: {
         'image/jpg': ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
      }
   });

   useEffect(() => {
      let e = events;

      setLoading(true)
      let controller = new ControllerUsuario();
      // controller.DAO.Usuario(authState.user.USU_USUARIO).then(data => {
      //    if (e) {
      //       e.data = data;
      //       e.state = EnumCrudStateRecordType.ALTERAR;
      //    }
      //    setEventsManutencao(e);
      //    setFoto(data.USU_FOTO)
      // }).finally(() => {
      //    setLoading(false);
      // });
   }, [])

   useEffect(() => {
      if (acceptedFiles.length > 0) {
         utilities.fileToBase64(acceptedFiles[0]).then(customJsonFile => {
            let data = dataModel?.data as IModelDoc001;
            data.USU_FOTO = customJsonFile.base64StringFile;
            eventsManuntencao?.dataModel?.setData(data);
            setFoto(customJsonFile.base64StringFile)
         });
      }
   }, [acceptedFiles]);

   useEffect(() => {
      if (fileRejections.length > 0) {
         fileRejections.forEach(file => {
            utilities.fileToBase64(file.file).then((customJsonFile) => {
               let isLarge = file.errors.filter(error => {
                  return error.code === 'file-too-large';
               })

               let msg: string | JSX.Element = file.errors[0].message;
               if (isLarge) {
                  msg = <Fragment>Tamanho da foto inválido.<br />Informe uma foto com máximo 5 Mb.</Fragment>
               }

               sweetAlertdispatch({
                  type: 'show',
                  props: {
                     title: "Arquivo inválido!",
                     type: 'danger',
                     onConfirm: () => {
                        sweetAlertdispatch({ type: 'close' });
                     }
                  },
                  msg
               });
            });
         });
      }
   }, [fileRejections]);

   const afterSave = (user: IModelDoc001) => {
      let authUser = { ...authState.user };
      authUser.USU_NOME = user.USU_NOME;
      authUser.USU_FOTO = user.USU_FOTO;
      authDispatch({
         type: 'profile',
         user: authUser
      });
   }

   const onAlterarSenha = () => {
      if (!validateSenhas.validateAll())
         return;

      validateSenhas.cleanMessage('PERFIL_USU_SENHA_ATUAL');
      if (authState.user.USU_SENHA !== md5(senhaAtual!)) {
         validateSenhas.setErrorMessage('PERFIL_USU_SENHA_ATUAL', 'Senha inválida');

         sweetAlertdispatch({
            type: 'show',
            props: {
               title: 'Atenção',
               type: 'error',
               onConfirm: () => {
                  sweetAlertdispatch({ type: 'close' });
               }
            },
            msg: 'As senha atual informada é inválida'
         });

         return;
      }

      if (senhaNova !== senhaConfirmacao) {

         validateSenhas.setErrorMessage('PERFIL_USU_SENHA', 'As senhas não conferem');
         validateSenhas.setErrorMessage('PERFIL_USU_SENHA_CONFIRMACAO', 'As senhas não conferem');

         sweetAlertdispatch({
            type: 'show',
            props: {
               title: 'Atenção',
               type: 'error',
               onConfirm: () => {
                  sweetAlertdispatch({ type: 'close' });
               }
            },
            msg: 'As senhas informadas não conferem!'
         });

         return
      }

      validateSenhas.cleanMessage('PERFIL_USU_SENHA');
      validateSenhas.cleanMessage('PERFIL_USU_SENHA_CONFIRMACAO');

      setLoadingAlterarSenha(true);
      let controller = new ControllerUsuario();
      // controller.AlterarSenha(senhaNova!).then(data => {
      //    sweetAlertdispatch({
      //       type: 'show',
      //       props: {
      //          title: 'Atenção',
      //          type: 'success',
      //          onConfirm: () => {
      //             sweetAlertdispatch({ type: 'close' });
      //          }
      //       },
      //       msg: 'Operação realizada com sucesso'
      //    });
      //    setSenhaAtual('');
      //    setSenhaConfirmacao('');
      //    setSenhaNova('');
      // }).catch(error => {
      //    sweetAlertdispatch({
      //       type: 'show',
      //       props: {
      //          title: 'Atenção',
      //          type: 'error',
      //          onConfirm: () => {
      //             sweetAlertdispatch({ type: 'close' });
      //          }
      //       },
      //       msg: error
      //    });
      // }).finally(() => {
      //    setLoadingAlterarSenha(false);
      // });
   }

   return (
      <CrudManutencao
         loading={loading}
         showMessageSuccessOnSave
         layout='customized'
         events={eventsManuntencao}
         urlPostMount={(url: string, id: string | number, data: any) => {
            return `${url}/${id}`;
         }}
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
                                                <div className="p-image">
                                                   <i className="ri-pencil-line upload-button" onClick={open} />
                                                   <div {...getRootProps()}>
                                                      <input {...getInputProps({ className: "d-none" })} />
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="row align-items-center">
                                          <div className="col-12 col-md-3 col-lg-2 mb-3">
                                             <Input
                                                label="Usuário"
                                                charCase={EnumCharcasetypes.UPPERCASE}
                                                dataModel={dataModel}
                                                id="USU_USUARIO"
                                                readOnly
                                             />
                                          </div>
                                          <div className="col-12 col-md-3 col-lg-2 mb-3">
                                             <InputDateTime
                                                type='date'
                                                label="Data de Cadastro"
                                                dataModel={dataModel}
                                                id="USU_DTCADASTRO"
                                                readOnly
                                             />
                                          </div>
                                          <div className="col-12 col-md-3 col-lg-2 mb-3">
                                             <InputDateTime
                                                type='date'
                                                label="Data de Alteração"
                                                dataModel={dataModel}
                                                id="USU_DTALTERACAO"
                                                readOnly
                                             />
                                          </div>
                                       </div>
                                       <div className="row">
                                          <div className="col-12 col-md-9 col-lg-6 mb-3">
                                             <Input
                                                label="Nome"
                                                dataModel={dataModel}
                                                id="USU_NOME"
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
                                          onClick={params.onSaveButtonClick}
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
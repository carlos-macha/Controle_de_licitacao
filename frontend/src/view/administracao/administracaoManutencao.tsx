import { Fragment } from "react";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import Crudmanutencao, { ManutencaoProps } from "../../base/components/crud/manutencao/crudmanutencao";
import { InputDataValue } from "../../base/types/types";
import { EnumCharcasetypes, Input, InputSelect, InputSwitch } from "../../base/components/form/form";

interface AdministracaoManutencaoProps extends ManutencaoProps { }

const AdministracaoManutencao: React.FC<AdministracaoManutencaoProps> = (props) => {
    const { events } = props;

    const onInit = (data: any, state: EnumCrudStateRecordType) => {
        if (state === EnumCrudStateRecordType.INCLUIR) {
            data.LOGIN = '';
            data.NOME = '';
            data.ATIVO = 'A';
            data.PERFIL = 'USER';
        }

        if (state === EnumCrudStateRecordType.ALTERAR) {
            data.REDEFINIR_SENHA = false;
        }
    };

    return (
        <Crudmanutencao
            events={events}
            onInit={onInit}
            urlPutMount={(url, data: any) => {
                if (!data.ID) {
                    return url;
                }

                return `${url}/${data.ID}`;
            }}
            onBody={(params) => {
                const dataModel: InputDataValue<any> = params.dataModel;
                const isAlterar = params.state === EnumCrudStateRecordType.ALTERAR;

                return (
                    <Fragment>
                        <div className="row">
                            <div className="col-12 col-md-4 mb-3">
                                <Input
                                    label="Login"
                                    dataModel={dataModel}
                                    id="LOGIN"
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={50}
                                    readOnly={isAlterar}
                                />
                            </div>

                            <div className="col-12 col-md-8 mb-3">
                                <Input
                                    label="Nome"
                                    dataModel={dataModel}
                                    id="NOME"
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    autoComplete="new-password"
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={100}
                                />
                            </div>
                        </div>

                        <div className="row">
                            {isAlterar && (
                                <div className="col-12 col-md-4 mb-3">
                                    <InputSwitch
                                        label="Redefinir senha"
                                        id="REDEFINIR_SENHA"
                                        dataModel={dataModel}
                                        valueForTrue={true}
                                        valueForFalse={false}
                                    />
                                </div>
                            )}

                            <div className="col-12 col-md-4 mb-3">
                                <InputSelect
                                    label="Ativo/Inativo"
                                    dataModel={dataModel}
                                    id="ATIVO"
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    options={[
                                        {
                                            value: 'A',
                                            label: 'Ativo'
                                        },
                                        {
                                            value: 'I',
                                            label: 'Inativo'
                                        }
                                    ]}
                                />
                            </div>

                            <div className="col-12 col-md-4 mb-3">
                                <InputSelect
                                    label="Perfil"
                                    dataModel={dataModel}
                                    id="PERFIL"
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    options={[
                                        {
                                            value: 'ADMIN',
                                            label: 'Administrador'
                                        },
                                        {
                                            value: 'USER',
                                            label: 'Usuário'
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </Fragment>
                );
            }}
        />
    );
};

export default AdministracaoManutencao;
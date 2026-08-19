import { Fragment } from "react";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import Crudmanutencao, { ManutencaoProps } from "../../base/components/crud/manutencao/crudmanutencao";
import { InputDataValue } from "../../base/types/types";
import { IModelLicitacao } from "../../models/modellicitacao";
import { EnumCharcasetypes, Input } from "../../base/components/form/form";
import LicitacaoDetalhes from "./licitacaoDetalhes";

interface LicitacaoManutencaoProps extends ManutencaoProps { }

const LicitacaoManutencao: React.FC<LicitacaoManutencaoProps> = (props) => {
    const { events, prefixId } = props;

    const onInit = (data: IModelLicitacao, state: EnumCrudStateRecordType) => {
        if (state === EnumCrudStateRecordType.INCLUIR) {
            data.PREGAO= '';
            data.PROCESSO_LICITATORIO = '';
            data.MUNICIPIO = '';
            data.ESTADO = '';
            data.DATA_CERTAME = undefined as any;
        }

        if (state === EnumCrudStateRecordType.ALTERAR) {
            if (data.DATA_CERTAME) {
                (data as any).DATA_CERTAME = String(data.DATA_CERTAME).substring(0, 10);
            }
        }

    }

    return (
        <Crudmanutencao
            events={events}
            onInit={onInit}
            urlPutMount={(url, data: IModelLicitacao) => {
                if (!data.ID) {
                    return url;
                }

                return `${url}/${data.ID}`;
            }}
            onBody={(params) => {

                const dataModel: InputDataValue<IModelLicitacao> = params.dataModel;

                return (
                    <Fragment>

                        <div className="row">

                            <div className="col-12 col-md-4 mb-3">
                                <Input
                                    label="Pregão"
                                    dataModel={dataModel}
                                    id="PREGAO"
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={30}
                                />
                            </div>

                            <div className="col-12 col-md-8 mb-3">
                                <Input
                                    label="Processo Licitatório"
                                    dataModel={dataModel}
                                    id="PROCESSO_LICITATORIO"
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={200}
                                />
                            </div>

                        </div>


                        <div className="row">

                            <div className="col-12 col-md-4 mb-3">
                                <Input
                                    label="Município"
                                    dataModel={dataModel}
                                    id="MUNICIPIO"
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={30}
                                />
                            </div>


                            <div className="col-12 col-md-3 mb-3">
                                <Input
                                    label="Data do Certame"
                                    dataModel={dataModel as any}
                                    id="DATA_CERTAME"
                                    type="date"
                                    validator={params.validateFields}
                                    validations={{
                                        required: false
                                    }}
                                />
                            </div>

                        </div>


                        <div className="row">
                            <div className="col-12">

                                <LicitacaoDetalhes
                                    dataModel={dataModel}
                                    data={dataModel.data}
                                    isManutencao
                                    state={params.state}
                                />

                            </div>
                        </div>

                    </Fragment>
                )
            }}
            
        />
    );
}

export default LicitacaoManutencao;
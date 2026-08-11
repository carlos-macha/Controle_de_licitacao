import { Fragment } from "react";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import Crudmanutencao, { ManutencaoProps } from "../../base/components/crud/manutencao/crudmanutencao";
import { InputDataValue } from "../../base/types/types";
import { IModelConcorrente } from "../../models/modelConcorrente";
import { EnumCharcasetypes, Input, InputCPFCNPJ, InputNumber } from "../../base/components/form/form";
import ConcorrentesDetalhes from "./concorrentesDetalhes";

interface ConcorrenteManutencaoProps extends ManutencaoProps { }

const ConcorrenteManutencao: React.FC<ConcorrenteManutencaoProps> = (props) => {
    const { events } = props;

    const onInit = (data: IModelConcorrente, state: EnumCrudStateRecordType) => {
        if (state === EnumCrudStateRecordType.INCLUIR) {
            data.NOME = '';
            data.CNPJ = '';
        }
    };

    return (
        <Crudmanutencao
            events={events}
            onInit={onInit}
            urlPutMount={(url, data: IModelConcorrente) => {
                if (!data.ID) {
                    return url;
                }

                return `${url}/${data.ID}`;
            }}
            onBody={(params) => {
                const dataModel: InputDataValue<IModelConcorrente> = params.dataModel;

                return (
                    <Fragment>
                        <div className="row">
                            <div className="col-12 col-md-8 mb-3">
                                <Input
                                    label="Nome"
                                    dataModel={dataModel}
                                    id="NOME"
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={200}
                                />
                            </div>

                            <div className="col-12 col-md-4 mb-3">
                                <InputNumber
                                    label="CNPJ"
                                    dataModel={dataModel}
                                    id="CNPJ"
                                    format="##.###.###/####-##"
                                    isText
                                    isNumericString={false}
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">

                                <ConcorrentesDetalhes
                                    dataModel={dataModel}
                                    data={dataModel.data}
                                    isManutencao
                                    state={params.state}
                                />

                            </div>
                        </div>

                    </Fragment>
                );
            }}
        />
    );
};

export default ConcorrenteManutencao;
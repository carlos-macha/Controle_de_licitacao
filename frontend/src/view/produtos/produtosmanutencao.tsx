import { Fragment } from "react";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import Crudmanutencao, { ManutencaoProps } from "../../base/components/crud/manutencao/crudmanutencao";
import { InputDataValue } from "../../base/types/types";
import { IModelProduto } from "../../models/modelProduto";
import { EnumCharcasetypes, Input, InputNumber } from "../../base/components/form/form";
import ProdutoDetalhe from "./produtosdetalhes";

interface ProdutosManutencaoProps extends ManutencaoProps { }

const ProdutosManutencao: React.FC<ProdutosManutencaoProps> = (props) => {
    const { events, prefixId } = props;

    const onInit = (data: IModelProduto, state: EnumCrudStateRecordType) => {
        if (state === EnumCrudStateRecordType.INCLUIR) {
            data.CODIGO_PRODUTO = 0;
            data.DESCRICAO = '';
            data.MARCA = '';
            data.MODELO = '';
            data.OBSERVACAO = '';
            data.PRECO_BASE = 0;
        }
    }

    return (
        <Crudmanutencao
            events={events}
            onInit={onInit}
            urlPutMount={(url, data: IModelProduto) => {
                if (!data.ID) {
                    return url;
                }

                return `${url}/${data.ID}`;
            }}
            onBody={(params) => {
                const dataModel: InputDataValue<IModelProduto> = params.dataModel;
                return (
                    <Fragment>
                        <div className="row">

                            <div className="col-12 col-md-5 mb-3">
                                <Input
                                    label="Código do Produto"
                                    dataModel={dataModel}
                                    id="CODIGO_PRODUTO"
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={30}
                                />
                            </div>

                            <div className="col-12 col-md-7 mb-3">
                                <Input
                                    label="Modelo"
                                    dataModel={dataModel}
                                    id="MODELO"
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={100}
                                />
                            </div>

                        </div>


                        <div className="row">

                            <div className="col-12 col-md-5 mb-3">
                                <Input
                                    label="Marca"
                                    dataModel={dataModel}
                                    id="MARCA"
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={100}
                                />
                            </div>


                            <div className="col-12 col-md-3 mb-3">
                                <InputNumber
                                    label="Preço Base"
                                    dataModel={dataModel}
                                    id="PRECO_BASE"
                                    validator={params.validateFields}

                                    validations={{
                                        required: true
                                    }}
                                    maxLength={15}
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-12">
                                <ProdutoDetalhe
                                    dataModel={dataModel}
                                    isManutencao
                                />
                            </div>
                        </div>
                    </Fragment>
                )
            }}
        />
    );
}

export default ProdutosManutencao;
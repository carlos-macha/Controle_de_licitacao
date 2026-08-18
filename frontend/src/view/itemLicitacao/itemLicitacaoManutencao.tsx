import { Fragment, useRef, useState } from "react";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import Crudmanutencao, { ManutencaoProps } from "../../base/components/crud/manutencao/crudmanutencao";
import { InputDataValue } from "../../base/types/types";
import { IModelItemLicitacao } from "../../models/modelItemLicitacao";
import Button, { EnumCharcasetypes, Input, InputNumber } from "../../base/components/form/form";
import Custommodal from "../../base/components/modal/custommodal";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import LicitacaoContainer from "../licitacao/licitacaoContainer";
import { IModelLicitacao } from "../../models/modellicitacao";
import DAO from "../../base/daos/dao";
import ItemLicitacaoDetalhe from "./itemLicitacaoDetalhe";

interface ItemLicitacaoManutencaoProps extends ManutencaoProps { }

const ItemLicitacaoManutencao: React.FC<ItemLicitacaoManutencaoProps> = (props) => {
    const { events } = props;
    const viewModalLicitacaoRef = useRef<any>(null);
    const [licitacaoSelecionada, setLicitacaoSelecionada] =
        useState<IModelLicitacao>();

    const dao = new DAO();

    const onInit = async (
        data: IModelItemLicitacao,
        state: EnumCrudStateRecordType
    ) => {
        if (state === EnumCrudStateRecordType.INCLUIR) {
            data.LICITACAO_ID = 0;
            data.ITEM = 0;
            data.DESCRICAO = "";
            data.MARCA = "";
            data.MODELO = "";
            data.QUANTIDADE = 0;
            data.UNIDADE = "";
        }

        if (state === EnumCrudStateRecordType.ALTERAR) {

            if (data.LICITACAO_ID) {
                try {
                    const item = await dao.List(
                        `/licitacoes/${data.LICITACAO_ID}`
                    ) as unknown as IModelLicitacao;

                    if (item) {
                        data.LICITACAO_ID = item.ID;
                        data.LICITACAO = `${item.ID} - ${item.PROCESSO_LICITATORIO}`;
                    }
                } catch (error) {
                    console.error("Erro ao carregar item da licitação:", error);
                }
            }
        }
    };

    const viewModalLicitacao = (
        dataModel: InputDataValue<IModelItemLicitacao>
    ): JSX.Element => {
        return (
            <Custommodal
                ref={viewModalLicitacaoRef}
                largeType="extra-large"
            >
                <Card>
                    <CardHeader
                        title="Itens da Licitação"
                        showSelectButton
                        showCancelButton
                        onSelectButtonClick={() => {
                            if (!licitacaoSelecionada) {
                                return;
                            }

                            dataModel.setData({
                                ...dataModel.data,
                                LICITACAO_ID:
                                    licitacaoSelecionada.ID,
                                LICITACAO:
                                    `${licitacaoSelecionada.ID} - ${licitacaoSelecionada.PROCESSO_LICITATORIO}`
                            });

                            viewModalLicitacaoRef.current?.close();
                        }}
                        onCancelButtonClick={() => {
                            viewModalLicitacaoRef.current?.close();
                        }}
                    />

                    <CardBody>
                        <LicitacaoContainer
                            params={{
                                isModal: true,
                                onSelecionar: (
                                    item: IModelLicitacao
                                ) => {
                                    setLicitacaoSelecionada(item);
                                }
                            }}
                        />
                    </CardBody>
                </Card>
            </Custommodal>
        );
    };

    return (
        <Crudmanutencao
            events={events}
            onInit={onInit}
            urlPutMount={(
                url,
                data: IModelItemLicitacao
            ) => {
                if (!data.ID) {
                    return url;
                }

                return `${url}/${data.ID}`;
            }}
            onBody={(params) => {
                const dataModel:
                    InputDataValue<IModelItemLicitacao> =
                    params.dataModel;

                return (
                    <Fragment>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    Licitação{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="input-group">
                                    <div className="flex-grow-1">
                                        <Input
                                            id="LICITACAO"
                                            dataModel={dataModel}
                                            validator={
                                                params.validateFields
                                            }
                                            validations={{
                                                required: true
                                            }}
                                            readOnly
                                        />
                                    </div>

                                    <div className="input-group-append">
                                        <Button
                                            classIcon="mdi mdi-magnify m-1"
                                            className="btn btn-primary"
                                            title="Consultar Licitação"
                                            overlayProps={{
                                                placement: "top"
                                            }}
                                            onClick={() => {
                                                viewModalLicitacaoRef.current?.open();
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Item"
                                    id="ITEM"
                                    dataModel={dataModel}
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    decimalScale={0}
                                    allowNegative={false}
                                    maxLength={10}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <Input
                                    label="Marca"
                                    id="MARCA"
                                    dataModel={dataModel}
                                    validator={params.validateFields}
                                    maxLength={200}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <Input
                                    label="Modelo"
                                    id="MODELO"
                                    dataModel={dataModel}
                                    validator={params.validateFields}
                                    maxLength={200}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Quantidade"
                                    id="QUANTIDADE"
                                    dataModel={dataModel}
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    maxLength={20}
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <Input
                                    label="Unidade"
                                    id="UNIDADE"
                                    dataModel={dataModel}
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={50}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <ItemLicitacaoDetalhe
                                    dataModel={dataModel}
                                    isManutencao
                                />
                            </div>
                        </div>
                        {viewModalLicitacao(dataModel)}
                    </Fragment>
                );
            }}
        />
    );
};

export default ItemLicitacaoManutencao;
import { Fragment, useRef, useState } from "react";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import Crudmanutencao, { ManutencaoProps } from "../../base/components/crud/manutencao/crudmanutencao";
import { InputDataValue } from "../../base/types/types";
import { IModelResultadoLicitacao } from "../../models/modelResultadoLicitacao";
import Button, { Input, InputNumber } from "../../base/components/form/form";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Custommodal from "../../base/components/modal/custommodal";
import DAO from "../../base/daos/dao";
import { IModelItemLicitacao } from "../../models/modelItemLicitacao";
import { IModelConcorrente } from "../../models/modelConcorrente";
//import ItemLicitacaoContainer from "../itemLicitacao/itemLicitacaoContainer";
import ConcorrentesContainer from "../concorrentes/concorrentesContainer";

interface ResultadoLicitacaoManutencaoProps extends ManutencaoProps { }

const ResultadoLicitacaoManutencao: React.FC<ResultadoLicitacaoManutencaoProps> = (props) => {
    const { events } = props;

    const viewModalItemRef = useRef<any>(null);
    const viewModalConcorrenteRef = useRef<any>(null);

    const [itemSelecionado, setItemSelecionado] =
        useState<IModelItemLicitacao>();

    const [concorrenteSelecionado, setConcorrenteSelecionado] =
        useState<IModelConcorrente>();

    const dao = new DAO();

    const onInit = async (
        data: IModelResultadoLicitacao,
        state: EnumCrudStateRecordType
    ) => {
        if (state === EnumCrudStateRecordType.INCLUIR) {
            data.ITEM_LICITACAO_ID = 0;
            data.CONCORRENTE_ID = 0;
            data.PRECO_GANHO = 0;
            data.VALOR_TOTAL_LANCE = 0;
            data.VALOR_ORCADO = 0;
            data.VALOR_TOTAL_ORCADO = 0;
            data.ECONOMIA_PERCENTUAL = 0;
            data.ECONOMIA_REAIS = 0;
            data.DATA_RELATORIO = "";
            data.HORA_RELATORIO = "";
        }

        if (
            state === EnumCrudStateRecordType.ALTERAR &&
            data.DATA_RELATORIO
        ) {
            data.DATA_RELATORIO =
                String(data.DATA_RELATORIO).substring(0, 10);
        }

        if (
            state === EnumCrudStateRecordType.ALTERAR &&
            data.ITEM_LICITACAO_ID
        ) {
            try {
                const item = await dao.List(
                    `/item-licitacoes/${data.ITEM_LICITACAO_ID}`
                ) as unknown as IModelItemLicitacao;

                /*if (item) {
                    data.ITEM_LICITACAO =
                        `${item.ID} - ${item.DESCRICAO}`;
                }*/
            } catch (error) {
                console.error(
                    "Erro ao carregar item da licitação:",
                    error
                );
            }
        }

        if (
            state === EnumCrudStateRecordType.ALTERAR &&
            data.CONCORRENTE_ID
        ) {
            try {
                const concorrente = await dao.List(
                    `/concorrentes/${data.CONCORRENTE_ID}`
                ) as unknown as IModelConcorrente;

                if (concorrente) {
                    data.CONCORRENTE_ID =
                        `${concorrente.ID} - ${concorrente.NOME}`;
                }
            } catch (error) {
                console.error(
                    "Erro ao carregar concorrente:",
                    error
                );
            }
        }
    };

    const viewModalItens = (
        dataModel: InputDataValue<IModelResultadoLicitacao>
    ): JSX.Element => {
        return (
            <Custommodal
                ref={viewModalItemRef}
                largeType="extra-large"
            >
                <Card>
                    <CardHeader
                        title="Itens da Licitação"
                        showSelectButton
                        showCancelButton
                        onSelectButtonClick={() => {
                            if (!itemSelecionado) {
                                return;
                            }

                            dataModel.setData({
                                ...dataModel.data,
                                ITEM_LICITACAO_ID:
                                    itemSelecionado.ID,
                                /*ITEM_LICITACAO:
                                    `${itemSelecionado.ID} - ${itemSelecionado.DESCRICAO}`*/
                            });

                            viewModalItemRef.current?.close();
                        }}
                        onCancelButtonClick={() => {
                            viewModalItemRef.current?.close();
                        }}
                    />

                    <CardBody>
                        <ItemLicitacaoContainer
                            params={{
                                isModal: true,
                                onSelecionar: (
                                    item: IModelItemLicitacao
                                ) => {
                                    setItemSelecionado(item);
                                }
                            }}
                        />
                    </CardBody>
                </Card>
            </Custommodal>
        );
    };

    const viewModalConcorrentes = (
        dataModel: InputDataValue<IModelResultadoLicitacao>
    ): JSX.Element => {
        return (
            <Custommodal
                ref={viewModalConcorrenteRef}
                largeType="extra-large"
            >
                <Card>
                    <CardHeader
                        title="Concorrentes"
                        showSelectButton
                        showCancelButton
                        onSelectButtonClick={() => {
                            if (!concorrenteSelecionado) {
                                return;
                            }

                            dataModel.setData({
                                ...dataModel.data,
                                CONCORRENTE_ID:
                                    concorrenteSelecionado.ID,
                                CONCORRENTE:
                                    `${concorrenteSelecionado.ID} - ${concorrenteSelecionado.NOME}`
                            });

                            viewModalConcorrenteRef.current?.close();
                        }}
                        onCancelButtonClick={() => {
                            viewModalConcorrenteRef.current?.close();
                        }}
                    />

                    <CardBody>
                        <ConcorrentesContainer
                            params={{
                                isModal: true,
                                onSelecionar: (
                                    concorrente: IModelConcorrente
                                ) => {
                                    setConcorrenteSelecionado(
                                        concorrente
                                    );
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
                data: IModelResultadoLicitacao
            ) => {
                if (!data.ID) {
                    return url;
                }

                return `${url}/${data.ID}`;
            }}
            onBody={(params) => {
                const dataModel:
                    InputDataValue<IModelResultadoLicitacao> =
                    params.dataModel;

                return (
                    <Fragment>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    Item da Licitação{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="input-group">
                                    <div className="flex-grow-1">
                                        <Input
                                            id="ITEM_LICITACAO"
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
                                            title="Consultar item"
                                            overlayProps={{
                                                placement: "top"
                                            }}
                                            onClick={() => {
                                                viewModalItemRef.current?.open();
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    Concorrente{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="input-group">
                                    <div className="flex-grow-1">
                                        <Input
                                            id="CONCORRENTE"
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
                                            title="Consultar concorrente"
                                            overlayProps={{
                                                placement: "top"
                                            }}
                                            onClick={() => {
                                                viewModalConcorrenteRef.current?.open();
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Preço Ganho"
                                    id="PRECO_GANHO"
                                    dataModel={dataModel}
                                    validator={
                                        params.validateFields
                                    }
                                    validations={{
                                        required: true
                                    }}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    maxLength={20}
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Valor Total do Lance"
                                    id="VALOR_TOTAL_LANCE"
                                    dataModel={dataModel}
                                    validator={
                                        params.validateFields
                                    }
                                    validations={{
                                        required: true
                                    }}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    maxLength={20}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Valor Orçado"
                                    id="VALOR_ORCADO"
                                    dataModel={dataModel}
                                    validator={
                                        params.validateFields
                                    }
                                    validations={{
                                        required: true
                                    }}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    maxLength={20}
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Valor Total Orçado"
                                    id="VALOR_TOTAL_ORCADO"
                                    dataModel={dataModel}
                                    validator={
                                        params.validateFields
                                    }
                                    validations={{
                                        required: true
                                    }}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    maxLength={20}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Economia Percentual"
                                    id="ECONOMIA_PERCENTUAL"
                                    dataModel={dataModel}
                                    validator={
                                        params.validateFields
                                    }
                                    validations={{
                                        required: true
                                    }}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    suffix="%"
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    maxLength={6}
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Economia em Reais"
                                    id="ECONOMIA_REAIS"
                                    dataModel={dataModel}
                                    validator={
                                        params.validateFields
                                    }
                                    validations={{
                                        required: true
                                    }}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    maxLength={20}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <Input
                                    label="Data do Relatório"
                                    id="DATA_RELATORIO"
                                    dataModel={dataModel as any}
                                    type="date"
                                    validator={
                                        params.validateFields
                                    }
                                    validations={{
                                        required: true
                                    }}
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <Input
                                    label="Hora do Relatório"
                                    id="HORA_RELATORIO"
                                    dataModel={dataModel as any}
                                    type="time"
                                    validator={
                                        params.validateFields
                                    }
                                    validations={{
                                        required: true
                                    }}
                                />
                            </div>
                        </div>

                        {viewModalItens(dataModel)}
                        {viewModalConcorrentes(dataModel)}
                    </Fragment>
                );
            }}
        />
    );
};

export default ResultadoLicitacaoManutencao;


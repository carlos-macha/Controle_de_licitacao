import { Fragment, useRef, useState } from "react";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import Crudmanutencao, { ManutencaoProps } from "../../base/components/crud/manutencao/crudmanutencao";
import { InputDataValue } from "../../base/types/types";
import { IModelResultadoLicitacao } from "../../models/modelResultadoLicitacao";
import Button, { Input, InputNumber, InputDateTime } from "../../base/components/form/form";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Custommodal from "../../base/components/modal/custommodal";
import DAO from "../../base/daos/dao";
import { IModelLicitacao } from "../../models/modellicitacao";
import { IModelProduto } from "../../models/modelProduto";
import LicitacaoContainer from "../licitacao/licitacaoContainer";
import ProdutosContainer from "../produtos/produtosContainer";
import { IModelConcorrente } from "../../models/modelConcorrente";
import ConcorrentesContainer from "../concorrentes/concorrentesContainer";

interface ResultadoLicitacaoManutencaoProps extends ManutencaoProps { }

const ResultadoLicitacaoManutencao: React.FC<ResultadoLicitacaoManutencaoProps> = (props) => {
    const { events } = props;

    const viewModalLicitacaoRef = useRef<any>(null);
    const viewModalProdutoRef = useRef<any>(null);
    const viewModalConcorrenteRef = useRef<any>(null);

    const [licitacaoSelecionada, setLicitacaoSelecionada] = useState<IModelLicitacao>();
    const [produtoSelecionado, setProdutoSelecionado] = useState<IModelProduto>();
    const [concorrenteSelecionado, setConcorrenteSelecionado] = useState<IModelConcorrente>();

    const dao = new DAO();

    const onInit = async (
        data: IModelResultadoLicitacao,
        state: EnumCrudStateRecordType
    ) => {
        if (state === EnumCrudStateRecordType.INCLUIR) {
            data.CODIGO_LICITACAO = 0;
            data.CODIGO_CONCORRENTE = 0;
            data.CODIGO_PRODUTO = 0;
            data.PRECO_GANHO = 0;
            data.DATA_RESULTADO = "";
        }

        if (state === EnumCrudStateRecordType.ALTERAR) {
            if (data.DATA_RESULTADO) {
                (data as any).DATA_RESULTADO = String(data.DATA_RESULTADO).substring(0, 10);
            }
        }

        if (state === EnumCrudStateRecordType.ALTERAR && data.CODIGO_LICITACAO) {
            try {
                const licitacao = await dao.List(
                    `/licitacoes/${data.CODIGO_LICITACAO}`
                ) as unknown as IModelLicitacao;

                if (licitacao) {
                    data.LICITACAO = `${licitacao.ID} - ${licitacao.DESCRICAO}`;
                }
            } catch (error) {
                console.error("Erro ao carregar licitação:", error);
            }
        }

        if (state === EnumCrudStateRecordType.ALTERAR && data.CODIGO_PRODUTO) {
            try {
                const produto = await dao.List(
                    `/produtos/${data.CODIGO_PRODUTO}`
                ) as unknown as IModelProduto;

                if (produto) {
                    data.PRODUTO = `${produto.ID} - ${produto.DESCRICAO}`;
                }
            } catch (error) {
                console.error("Erro ao carregar produto:", error);
            }
        }

        if (state === EnumCrudStateRecordType.ALTERAR && data.CODIGO_CONCORRENTE) {
            try {
                const concorrente = await dao.List(
                    `/concorrentes/${data.CODIGO_CONCORRENTE}`
                ) as unknown as IModelConcorrente;

                if (concorrente) {
                    data.CONCORRENTE = `${concorrente.ID} - ${concorrente.NOME}`;
                }
            } catch (error) {
                console.error("Erro ao carregar concorrente:", error);
            }
        }
    };

    const viewModalLicitacoes = (
        dataModel: InputDataValue<IModelResultadoLicitacao>
    ): JSX.Element => {
        return (
            <Custommodal ref={viewModalLicitacaoRef} largeType="extra-large">
                <Card>
                    <CardHeader
                        title="Licitações"
                        showSelectButton
                        showCancelButton
                        onSelectButtonClick={() => {
                            if (!licitacaoSelecionada) {
                                return;
                            }

                            dataModel.setData({
                                ...dataModel.data,
                                CODIGO_LICITACAO: licitacaoSelecionada.ID,
                                LICITACAO: `${licitacaoSelecionada.ID} - ${licitacaoSelecionada.DESCRICAO}`
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
                                onSelecionar: (licitacao: IModelLicitacao) => {
                                    setLicitacaoSelecionada(licitacao);
                                }
                            }}
                        />
                    </CardBody>
                </Card>
            </Custommodal>
        );
    };

    const viewModalProdutos = (
        dataModel: InputDataValue<IModelResultadoLicitacao>
    ): JSX.Element => {
        return (
            <Custommodal
                ref={viewModalProdutoRef}
                largeType="extra-large"
                showOverlay={false}
            >
                <Card className="iq-card mb-0">
                    <CardHeader
                        title="Produtos"
                        showSelectButton
                        showCancelButton
                        onSelectButtonClick={() => {
                            if (!produtoSelecionado) {
                                return;
                            }

                            dataModel.setData({
                                ...dataModel.data,
                                CODIGO_PRODUTO: produtoSelecionado.ID,
                                PRODUTO: `${produtoSelecionado.ID} - ${produtoSelecionado.DESCRICAO}`
                            });

                            viewModalProdutoRef.current?.close();
                        }}
                        onCancelButtonClick={() => {
                            viewModalProdutoRef.current?.close();
                        }}
                    />
                    <CardBody>
                        <ProdutosContainer
                            params={{
                                isModal: true,
                                onSelecionar: (produto: IModelProduto) => {
                                    setProdutoSelecionado(produto);
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
            <Custommodal ref={viewModalConcorrenteRef} largeType="extra-large">
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
                                CODIGO_CONCORRENTE: concorrenteSelecionado.ID,
                                CONCORRENTE: `${concorrenteSelecionado.ID} - ${concorrenteSelecionado.NOME}`
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
                                onSelecionar: (concorrente: IModelConcorrente) => {
                                    setConcorrenteSelecionado(concorrente);
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
            urlPutMount={(url, data: IModelResultadoLicitacao) => {
                if (!data.ID) {
                    return url;
                }

                return `${url}/${data.ID}`;
            }}
            onBody={(params) => {
                const dataModel: InputDataValue<IModelResultadoLicitacao> =
                    params.dataModel;

                return (
                    <Fragment>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    Licitação <span className="text-danger">*</span>
                                </label>

                                <div className="input-group">
                                    <div className="flex-grow-1">
                                        <Input
                                            id="LICITACAO"
                                            dataModel={dataModel}
                                            validator={params.validateFields}
                                            validations={{
                                                required: true
                                            }}
                                            readOnly
                                        />
                                    </div>

                                    <div className="input-group-append">
                                        <Button
                                            classIcon="mdi mdi-account-search m-1"
                                            className="btn btn-primary"
                                            title="Consultar licitação"
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
                                <label className="form-label">
                                    Concorrente <span className="text-danger">*</span>
                                </label>

                                <div className="input-group">
                                    <div className="flex-grow-1">
                                        <Input
                                            id="CONCORRENTE"
                                            dataModel={dataModel}
                                            validator={params.validateFields}
                                            validations={{
                                                required: true
                                            }}
                                            readOnly
                                        />
                                    </div>

                                    <div className="input-group-append">
                                        <Button
                                            classIcon="mdi mdi-account-search m-1"
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

                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    Produto <span className="text-danger">*</span>
                                </label>

                                <div className="input-group">
                                    <div className="flex-grow-1">
                                        <Input
                                            id="PRODUTO"
                                            dataModel={dataModel}
                                            validator={params.validateFields}
                                            validations={{
                                                required: true
                                            }}
                                            readOnly
                                        />
                                    </div>

                                    <div className="input-group-append">
                                        <Button
                                            classIcon="mdi mdi-account-search m-1"
                                            className="btn btn-primary"
                                            title="Consultar produto"
                                            overlayProps={{
                                                placement: "top"
                                            }}
                                            onClick={() => {
                                                viewModalProdutoRef.current?.open();
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Preço ganho"
                                    id="PRECO_GANHO"
                                    dataModel={dataModel}
                                    validator={params.validateFields}
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
                                <Input
                                    label="Data do Resultado"
                                    dataModel={dataModel as any}
                                    id="DATA_RESULTADO"
                                    type="date"
                                    validator={params.validateFields}
                                    validations={{
                                        required: true
                                    }}
                                />
                            </div>
                        </div>

                        {viewModalLicitacoes(dataModel)}
                        {viewModalProdutos(dataModel)}
                        {viewModalConcorrentes(dataModel)}
                    </Fragment>
                );
            }}
        />
    );
};

export default ResultadoLicitacaoManutencao;

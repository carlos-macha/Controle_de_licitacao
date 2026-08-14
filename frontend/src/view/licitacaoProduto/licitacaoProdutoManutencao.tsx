import { Fragment, useEffect, useRef, useState } from "react";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import Crudmanutencao, { ManutencaoProps } from "../../base/components/crud/manutencao/crudmanutencao";
import { InputDataValue } from "../../base/types/types";
import { IModelLicitacaoProduto } from "../../models/modelLicitacaoProduto";
import Button, { Input, InputNumber } from "../../base/components/form/form";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Custommodal, { CustomModalRef } from "../../base/components/modal/custommodal";
import ProdutosContainer from "../produtos/produtosContainer";
import { IModelProduto } from "../../models/modelProduto";
import DAO from "../../base/daos/dao";
import { IModelLicitacao } from "../../models/modellicitacao";
import LicitacaoContainer from "../licitacao/licitacaoContainer";

interface LicitacaoProdutoManutencaoProps extends ManutencaoProps { }

const LicitacaoProdutoManutencao: React.FC<LicitacaoProdutoManutencaoProps> = (props) => {
    const { events } = props;
    const viewModalProdutoRef = useRef<CustomModalRef>(null);
    const viewModalLicitacaoRef = useRef<CustomModalRef>(null);
    const [produtoSelecionado, setProdutoSelecionado] = useState<IModelProduto>();
    const [LicitacaoSelecionado, setLicitacaoSelecionado] = useState<IModelLicitacao>();


    const dao = new DAO();


    const onInit = async (
        data: IModelLicitacaoProduto,
        state: EnumCrudStateRecordType
    ) => {
        if (state === EnumCrudStateRecordType.INCLUIR) {
            data.CODIGO_LICITACAO = 0;
            data.CODIGO_PRODUTO = 0;
            data.PRODUTO = '';
            data.QUANTIDADE = 0;
            data.VALOR_UNITARIO_REFERENCIA = 0;
            data.VALOR_TOTAL_REFERENCIA = 0;
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
    };



    const viewModalProdutos = (
        dataModel: InputDataValue<IModelLicitacaoProduto>
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

    const viewModalLicitacoes = (
        dataModel: InputDataValue<IModelLicitacaoProduto>
    ): JSX.Element => {
        return (
            <Custommodal
                ref={viewModalLicitacaoRef}
                largeType="extra-large"
                showOverlay={false}
            >
                <Card className="iq-card mb-0">
                    <CardHeader
                        title="Licitações"
                        showSelectButton
                        showCancelButton
                        onSelectButtonClick={() => {
                            if (!LicitacaoSelecionado) {
                                return;
                            }

                            dataModel.setData({
                                ...dataModel.data,
                                CODIGO_LICITACAO: LicitacaoSelecionado.ID,
                                LICITACAO: `${LicitacaoSelecionado.ID} - ${LicitacaoSelecionado.DESCRICAO}`
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
                                    setLicitacaoSelecionado(licitacao);
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
            urlPutMount={(url, data: IModelLicitacaoProduto) => {
                if (!data.ID) {
                    return url;
                }

                return `${url}/${data.ID}`;
            }}
            onBody={(params) => {
                const dataModel: InputDataValue<IModelLicitacaoProduto> =
                    params.dataModel;

                return (
                    <Fragment>

                        <div className="row">
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
                                            style={{
                                                borderTopRightRadius: '0.25rem',
                                                borderBottomRightRadius: '0.25rem'
                                            }}
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
                                            style={{
                                                borderTopRightRadius: '0.25rem',
                                                borderBottomRightRadius: '0.25rem'
                                            }}
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
                                    allowNegative={false}
                                    maxLength={20}
                                    onValueChange={(values) => {
                                        const quantidade =
                                            Number(values.floatValue || 0);

                                        const valorUnitario =
                                            Number(
                                                dataModel.data.VALOR_UNITARIO_REFERENCIA || 0
                                            );

                                        dataModel.setData({
                                            ...dataModel.data,
                                            QUANTIDADE: quantidade,
                                            VALOR_TOTAL_REFERENCIA:
                                                quantidade * valorUnitario
                                        });
                                    }}
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Valor Unitário de Referência"
                                    id="VALOR_UNITARIO_REFERENCIA"
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
                                    onValueChange={(values) => {
                                        const valorUnitario =
                                            Number(values.floatValue || 0);

                                        const quantidade =
                                            Number(
                                                dataModel.data.QUANTIDADE || 0
                                            );

                                        dataModel.setData({
                                            ...dataModel.data,
                                            VALOR_UNITARIO_REFERENCIA:
                                                valorUnitario,
                                            VALOR_TOTAL_REFERENCIA:
                                                quantidade * valorUnitario
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        {viewModalProdutos(dataModel)}
                        {viewModalLicitacoes(dataModel)}
                    </Fragment>
                );
            }}
        />
    );
};

export default LicitacaoProdutoManutencao;

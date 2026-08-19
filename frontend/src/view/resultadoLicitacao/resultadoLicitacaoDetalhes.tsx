import { Fragment, useEffect, useRef, useState } from "react";
import { InputDataValue } from "../../base/types/types";
import { IModelResultadoLicitacao } from "../../models/modelResultadoLicitacao";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Tabs, { TabContent, TabItem, TabPanel } from "../../base/components/tab/tab";
import { nanoid } from "nanoid";
import DataTable from "../../base/components/datatable/datatable";
import DAO from "../../base/daos/dao";
import { IModelConcorrente } from "../../models/modelConcorrente";
import { IModelItemLicitacao } from "../../models/modelItemLicitacao";
import { Input, InputCPFCNPJ, TextArea } from "../../base/components/form/form";
import { IModelLicitacao } from "../../models/modellicitacao";

interface ResultadoLicitacaoDetalhesProps {
    dataModel?: InputDataValue<IModelResultadoLicitacao>;
    data?: IModelResultadoLicitacao;
    isManutencao?: boolean;
    validateFields?: any;
}

const ResultadoLicitacaoDetalhes: React.FC<ResultadoLicitacaoDetalhesProps> = ({
    data
}) => {
    const id = useRef(nanoid());
    const dao = new DAO();

    const [licitacao, setLicitacao] =
        useState<IModelLicitacao>();

    const [itemLicitacao, setItemLicitacao] =
        useState<IModelItemLicitacao>();

    const [concorrente, setConcorrente] =
        useState<IModelConcorrente>();

    useEffect(() => {
        const carregarDetalhe = async () => {
            if (!data) {
                return;
            }

            try {
                const itemLicitacao =
                    await dao.List(
                        `/itens-licitacao/${data.ITEM_LICITACAO_ID}`
                    ) as unknown as IModelItemLicitacao;

                const concorrente =
                    await dao.List(
                        `/concorrentes/${data.CONCORRENTE_ID}`
                    ) as unknown as IModelConcorrente;

                const licitacao =
                    await dao.List(
                        `/licitacoes/${itemLicitacao.LICITACAO_ID}`
                    ) as unknown as IModelLicitacao;

                setItemLicitacao(itemLicitacao);
                setConcorrente(concorrente);
                setLicitacao(licitacao);

            } catch (error) {
                console.error(
                    "Erro ao carregar detalhe:",
                    error
                );
            }
        };

        carregarDetalhe();
    }, [data]);

    return (
        <Fragment>
            <Card className="iq-card">

                <CardHeader className="iq-card-header p-2 border">

                    <Tabs className="nav nav-pills">

                        <TabItem
                            className="nav-item"
                            classNameLink="nav-link"
                            tabPanelRef={`item-${id.current}`}
                            selected={true}
                        >
                            Item
                        </TabItem>

                        <TabItem
                            className="nav-item"
                            classNameLink="nav-link"
                            tabPanelRef={`concorrente-${id.current}`}
                        >
                            Concorrente
                        </TabItem>

                        <TabItem
                            className="nav-item"
                            classNameLink="nav-link"
                            tabPanelRef={`licitacao-${id.current}`}
                        >
                            Licitação
                        </TabItem>

                    </Tabs>

                </CardHeader>

                <CardBody className="border iq-card-body">

                    <TabContent className="tab-content">

                        <TabPanel
                            className="tab-pane fade"
                            show={true}
                            id={`item-${id.current}`}
                        >
                            <div className="row">

                                <div className="col-md-2 mb-3">
                                    <Input
                                        label="Código"
                                        id="ID"
                                        dataModel={{
                                            data: itemLicitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-10 mb-3">
                                    <TextArea
                                        label="Descrição"
                                        id="DESCRICAO"
                                        dataModel={{
                                            data: itemLicitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-4 mb-3">
                                    <Input
                                        label="Marca"
                                        id="MARCA"
                                        dataModel={{
                                            data: itemLicitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <Input
                                        label="Modelo"
                                        id="MODELO"
                                        dataModel={{
                                            data: itemLicitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-2 mb-3">
                                    <Input
                                        label="Quantidade"
                                        id="QUANTIDADE"
                                        dataModel={{
                                            data: itemLicitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-2 mb-3">
                                    <Input
                                        label="Unidade"
                                        id="UNIDADE"
                                        dataModel={{
                                            data: itemLicitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-10 mb-3">
                                    <TextArea
                                        label="Observação"
                                        id="OBSERVACAO"
                                        dataModel={{
                                            data: itemLicitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel
                            className="tab-pane fade"
                            show={false}
                            id={`concorrente-${id.current}`}
                        >
                            <div className="row">

                                <div className="col-md-2 mb-3">
                                    <Input
                                        label="Código"
                                        id="ID"
                                        dataModel={{
                                            data: concorrente ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <Input
                                        label="Nome"
                                        id="NOME"
                                        dataModel={{
                                            data: concorrente ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <InputCPFCNPJ
                                        label="CNPJ"
                                        id="CNPJ"
                                        dataModel={{
                                            data: concorrente ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                            </div>
                        </TabPanel>

                        <TabPanel
                            className="tab-pane fade"
                            show={false}
                            id={`licitacao-${id.current}`}
                        >
                            <div className="row">

                                <div className="col-md-2 mb-3">
                                    <Input
                                        label="Código"
                                        id="ID"
                                        dataModel={{
                                            data: licitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <Input
                                        label="Pregão"
                                        id="PREGAO"
                                        dataModel={{
                                            data: licitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <Input
                                        label="Processo Licitatório"
                                        id="PROCESSO_LICITATORIO"
                                        dataModel={{
                                            data: licitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <Input
                                        label="Município"
                                        id="MUNICIPIO"
                                        dataModel={{
                                            data: licitacao ?? {},
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />
                                </div>

                            </div>
                        </TabPanel>

                    </TabContent>

                </CardBody>

            </Card>
        </Fragment>
    );
};

export default ResultadoLicitacaoDetalhes;
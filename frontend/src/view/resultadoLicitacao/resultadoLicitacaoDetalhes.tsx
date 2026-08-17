import { Fragment, useEffect, useRef, useState } from "react";
import { InputDataValue } from "../../base/types/types";
import { IModelResultadoLicitacao } from "../../models/modelResultadoLicitacao";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Tabs, { TabContent, TabItem, TabPanel } from "../../base/components/tab/tab";
import { nanoid } from "nanoid";
import DataTable from "../../base/components/datatable/datatable";
import DAO from "../../base/daos/dao";
//import { IModelProduto } from "../../models/modelProduto";
import { IModelLicitacao } from "../../models/modellicitacao";
import { IModelConcorrente } from "../../models/modelConcorrente";

interface ResultadoLicitacaoDetalhesProps {
    dataModel?: InputDataValue<IModelResultadoLicitacao>;
    data?: IModelResultadoLicitacao;
    isManutencao?: boolean;
    validateFields?: any;
}

const ResultadoLicitacaoDetalhes: React.FC<ResultadoLicitacaoDetalhesProps> = ({
    data,
    dataModel,
    isManutencao = false,
    validateFields
}) => {
    const id = useRef(nanoid());
    const dao = new DAO();
    const [detalhe, setDetalhe] = useState<any[]>([]);

    useEffect(() => {
        const carregarDetalhe = async () => {
            if (!data) {
                return;
            }

            try {

                const concorrente = await dao.List(
                    `/concorrentes/${data.CONCORRENTE_ID}`
                ) as unknown as IModelConcorrente;

                setDetalhe([
                    {
                        CONCORRENTE: concorrente
                            ? `${concorrente.ID} - ${concorrente.NOME}`
                            : "",
                        PRECO_GANHO: data.PRECO_GANHO,
                    }
                ]);
            } catch (error) {
                console.error("Erro ao carregar detalhe:", error);
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
                            tabPanelRef={`detalhe-${id.current}`}
                            selected={true}
                        >
                            Detalhe
                        </TabItem>
                    </Tabs>
                </CardHeader>

                <CardBody className="border iq-card-body">
                    <TabContent className="tab-content">
                        <TabPanel
                            className="tab-pane fade"
                            show={true}
                            id={`detalhe-${id.current}`}
                        >
                            <DataTable
                                key={JSON.stringify(detalhe)}
                                title="Resultado da Licitação"
                                columns={[
                                    {
                                        title: "Concorrente",
                                        field: "CONCORRENTE",
                                        width: 300,
                                        type: "string"
                                    },
                                ]}
                                data={detalhe}
                                options={{
                                    height: 200,
                                    pagination: false,
                                    layout: "fitDataFill",
                                    selectable: 1
                                }}
                                useRowId
                            />
                        </TabPanel>
                    </TabContent>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default ResultadoLicitacaoDetalhes;

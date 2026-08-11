import { Fragment, useEffect, useRef, useState } from "react";
import { InputDataValue } from "../../base/types/types";
import { IModelLicitacaoProduto } from "../../models/modelLicitacaoProduto";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Tabs, { TabContent, TabItem, TabPanel } from "../../base/components/tab/tab";
import { nanoid } from "nanoid";
import DataTable from "../../base/components/datatable/datatable";
import DAO from "../../base/daos/dao";
import { IModelProduto } from "../../models/modelProduto";
import { IModelLicitacao } from "../../models/modellicitacao";

interface LicitacaoProdutoDetalheProps {
    dataModel?: InputDataValue<IModelLicitacaoProduto>;
    data?: IModelLicitacaoProduto;
    isManutencao?: boolean;
    validateFields?: any;
}

const LicitacaoProdutoDetalhes: React.FC<LicitacaoProdutoDetalheProps> = ({
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
                const produto = await dao.List(
                    `/produtos/${data.CODIGO_PRODUTO}`
                ) as unknown as IModelProduto;

                const licitacao = await dao.List(
                    `/licitacoes/${data.CODIGO_LICITACAO}`
                ) as unknown as IModelLicitacao;

                setDetalhe([
                    {
                        PRODUTO: `${produto.ID} - ${produto.DESCRICAO}`,
                        LICITACAO: `${licitacao.ID} - ${licitacao.NOME}`
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
                                title="Produto da Licitação"
                                columns={[
                                    {
                                        title: "Produto",
                                        field: "PRODUTO",
                                        width: 300,
                                        type: "string"
                                    },
                                    {
                                        title: "Licitação",
                                        field: "LICITACAO",
                                        width: 300,
                                        type: "string"
                                    }
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

export default LicitacaoProdutoDetalhes;
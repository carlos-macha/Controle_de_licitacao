import { Fragment, useRef } from "react";
import { nanoid } from "nanoid";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Tabs, { TabContent, TabItem, TabPanel } from "../../base/components/tab/tab";
import { InputDataValue } from "../../base/types/types";
import { IModelProduto } from "../../models/modelProduto";

interface ProdutoDetalheProps {
    dataModel?: InputDataValue<IModelProduto>;
    data?: IModelProduto;
    isManutencao?: boolean;
    validateFields?: any;
}

const ProdutoDetalhe: React.FC<ProdutoDetalheProps> = ({ data, dataModel, isManutencao = false, validateFields }) => {
    const id = useRef(nanoid());

    return (
        <Fragment>
            <Card className="iq-card">
                <CardHeader className="iq-card-header p-2 border">
                    <Tabs className="nav nav-pills">
                        <TabItem className="nav-item" classNameLink="nav-link" tabPanelRef={`descricao-${id.current}`} selected={true}>Descrição</TabItem>
                        <TabItem className="nav-item" classNameLink="nav-link" tabPanelRef={`observacao-${id.current}`}>Observação</TabItem>
                    </Tabs>
                </CardHeader>

                <CardBody className="border iq-card-body">
                    <TabContent className="tab-content">

                        <TabPanel className="tab-pane fade" show={true} id={`descricao-${id.current}`}>
                            {isManutencao && dataModel ? (
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label className="form-label">
                                            Descrição <span className="text-danger">*</span>
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows={6}
                                            value={dataModel.data.DESCRICAO || ""}
                                            onChange={(e) => {
                                                dataModel.setData({
                                                    ...dataModel.data,
                                                    DESCRICAO: e.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Descrição</label>
                                        <textarea className="form-control" rows={6} value={data?.DESCRICAO || ""} readOnly />
                                    </div>
                                </div>
                            )}
                        </TabPanel>

                        <TabPanel className="tab-pane fade" id={`observacao-${id.current}`}>
                            {isManutencao && dataModel ? (
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Observação</label>
                                        <textarea
                                            className="form-control"
                                            rows={8}
                                            value={dataModel.data.OBSERVACAO || ""}
                                            onChange={(e) => {
                                                dataModel.setData({
                                                    ...dataModel.data,
                                                    OBSERVACAO: e.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Observação</label>
                                        <textarea className="form-control" rows={8} value={data?.OBSERVACAO || ""} readOnly />
                                    </div>
                                </div>
                            )}
                        </TabPanel>

                    </TabContent>
                </CardBody>
            </Card>
        </Fragment>
    );
}

export default ProdutoDetalhe;
import { Fragment, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Tabs, { TabContent, TabItem, TabPanel } from "../../base/components/tab/tab";
import { InputDataValue } from "../../base/types/types";
import { IModelLicitacao } from "../../models/modellicitacao";
import { useModalContext } from "../../hooks/useModalContext";
import Button from "../../base/components/form/form";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import DataTable from "../../base/components/datatable/datatable";

interface LicitacaoDetalhesProps {
    dataModel?: InputDataValue<IModelLicitacao>;
    data?: IModelLicitacao;
    isManutencao?: boolean;
    validateFields?: any;
    state?: EnumCrudStateRecordType;
}

const LicitacaoDetalhes: React.FC<LicitacaoDetalhesProps> = ({
    data,
    dataModel,
    isManutencao = false,
    state
}) => {

    const id = useRef(nanoid());

    const [enderecoAtualState, setEnderecoAtualState] = useState<any>();

    const { modalDispash } = useModalContext();


    const dadosAtuais = dataModel?.data ?? data;


    const enderecoAtual = enderecoAtualState ?? (dadosAtuais ? {
        ID: dadosAtuais.ID,
        LOGRADOURO: dadosAtuais.LOGRADOURO,
        NUMERO: dadosAtuais.NUMERO,
        BAIRRO: dadosAtuais.BAIRRO,
        CIDADE: dadosAtuais.CIDADE,
        ESTADO: dadosAtuais.ESTADO,
        CEP: dadosAtuais.CEP,
        COMPLEMENTO: dadosAtuais.COMPLEMENTO
    } : undefined);

    const temEndereco = enderecoAtual && Object.values(enderecoAtual).some(
        valor => valor !== null && valor !== undefined && valor !== ""
    );



    const atualizarEndereco = (endereco: any) => {

        setEnderecoAtualState(endereco);

        if (!dataModel) {
            return;
        }

        dataModel.setData({

            ...dataModel.data,

            LOGRADOURO: endereco.LOGRADOURO,
            NUMERO: endereco.NUMERO,
            BAIRRO: endereco.BAIRRO,
            CIDADE: endereco.CIDADE,
            ESTADO: endereco.ESTADO,
            CEP: endereco.CEP,
            COMPLEMENTO: endereco.COMPLEMENTO

        });

    };



    return (
        <Fragment>

            <Card className="iq-card">

                <CardHeader className="iq-card-header p-2 border">

                    <Tabs className="nav nav-pills">

                        <TabItem
                            className="nav-item"
                            classNameLink="nav-link"
                            tabPanelRef={`endereco-${id.current}`}
                            selected={true}
                        >
                            Endereço
                        </TabItem>

                        <TabItem
                            className="nav-item"
                            classNameLink="nav-link"
                            tabPanelRef={`descricao-${id.current}`}
                        >
                            Descrição
                        </TabItem>

                    </Tabs>

                </CardHeader>


                <CardBody className="border iq-card-body">

                    <TabContent className="tab-content">


                        <TabPanel
                            className="tab-pane fade"
                            show={true}
                            id={`endereco-${id.current}`}
                        >


                            {isManutencao && (

                                <div className="d-flex mb-1 justify-content-end">


                                    {state === EnumCrudStateRecordType.INCLUIR && (

                                        <Button
                                            className="btn btn-outline-primary btn-sm"
                                            classIcon="mdi mdi-plus-circle"
                                            caption="Incluir Endereço"
                                            data-toggle="modal"
                                            data-target="#licitacao-endereco-manutencao-modal"
                                            onClick={() => {
                                                modalDispash({

                                                    type: "licitacaoEnderecoManutencaoModal",

                                                    onSave: (endereco: any) => {

                                                        atualizarEndereco(endereco);

                                                    },

                                                    state: EnumCrudStateRecordType.INCLUIR

                                                });
                                            }}
                                        />

                                    )}



                                    {state === EnumCrudStateRecordType.ALTERAR && (

                                        <Button
                                            className="btn btn-outline-primary btn-sm mb-3"
                                            classIcon="mdi mdi-pencil-circle"
                                            caption="Alterar Endereço"
                                            data-toggle="modal"
                                            data-target="#licitacao-endereco-manutencao-modal"
                                            onClick={() => {

                                                if (!enderecoAtual) {
                                                    return;
                                                }

                                                modalDispash({

                                                    type: "licitacaoEnderecoManutencaoModal",

                                                    endereco: enderecoAtualState ?? enderecoAtual,

                                                    onSave: (endereco: any) => {

                                                        atualizarEndereco(endereco);

                                                    },

                                                    state: EnumCrudStateRecordType.ALTERAR

                                                });

                                            }}
                                        />

                                    )}

                                </div>

                            )}


                            {temEndereco &&
                                <DataTable

                                    key={JSON.stringify(enderecoAtual)}

                                    title="Endereço"

                                    columns={[
                                        {
                                            title: "Logradouro",
                                            field: "LOGRADOURO",
                                            width: 250,
                                            type: "string"
                                        },
                                        {
                                            title: "Número",
                                            field: "NUMERO",
                                            width: 100,
                                            type: "string"
                                        },
                                        {
                                            title: "Bairro",
                                            field: "BAIRRO",
                                            width: 180,
                                            type: "string"
                                        },
                                        {
                                            title: "Cidade",
                                            field: "CIDADE",
                                            width: 180,
                                            type: "string"
                                        },
                                        {
                                            title: "Estado",
                                            field: "ESTADO",
                                            width: 100,
                                            type: "string"
                                        },
                                        {
                                            title: "CEP",
                                            field: "CEP",
                                            width: 120,
                                            type: "string"
                                        },
                                        {
                                            title: "Complemento",
                                            field: "COMPLEMENTO",
                                            width: 200,
                                            type: "string"
                                        }
                                    ]}

                                    data={
                                        enderecoAtual
                                            ? [enderecoAtual]
                                            : []
                                    }

                                    options={{
                                        height: 200,
                                        pagination: false,
                                        layout: "fitDataFill",
                                        selectable: 1
                                    }}

                                    useRowId

                                />}


                        </TabPanel>



                        <TabPanel
                            className="tab-pane fade"
                            id={`descricao-${id.current}`}
                        >

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

                                        <label className="form-label">
                                            Descrição
                                        </label>


                                        <textarea
                                            className="form-control"
                                            rows={6}
                                            value={data?.DESCRICAO || ""}
                                            readOnly
                                        />

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


export default LicitacaoDetalhes;
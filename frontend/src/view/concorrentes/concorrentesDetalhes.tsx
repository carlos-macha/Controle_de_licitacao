import { Fragment, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Tabs, { TabContent, TabItem, TabPanel } from "../../base/components/tab/tab";
import { InputDataValue } from "../../base/types/types";
import { IModelConcorrente } from "../../models/modelConcorrente";
import { useModalContext } from "../../hooks/useModalContext";
import Button from "../../base/components/form/form";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import DataTable from "../../base/components/datatable/datatable";

interface ConcorrentesDetalhesProps {
    dataModel?: InputDataValue<IModelConcorrente>;
    data?: IModelConcorrente;
    isManutencao?: boolean;
    validateFields?: any;
    state?: EnumCrudStateRecordType;
}

const ConcorrentesDetalhes: React.FC<ConcorrentesDetalhesProps> = ({
    data,
    dataModel,
    isManutencao = false,
    state
}) => {
    const id = useRef(nanoid());

    const [enderecoAtualState, setEnderecoAtualState] = useState<any>();


    const [contatoAtualState, setContatoAtualState] = useState<any>();

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

    const contatoAtual = contatoAtualState ?? (dadosAtuais ? {
        ID: dadosAtuais.ID,
        EMAIL: dadosAtuais.EMAIL,
        TELEFONE: dadosAtuais.TELEFONE,
        CELULAR: dadosAtuais.CELULAR
    } : undefined);

    const temContato = contatoAtual && Object.values(contatoAtual).some(
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

    const atualizarContato = (contato: any) => {
        setContatoAtualState(contato);

        if (!dataModel) {
            return;
        }

        dataModel.setData({
            ...dataModel.data,
            EMAIL: contato.EMAIL,
            TELEFONE: contato.TELEFONE,
            CELULAR: contato.CELULAR
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
                            tabPanelRef={`contato-${id.current}`}
                        >
                            Contato
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
                                            data-target="#concorrentes-endereco-manutencao-modal"
                                            onClick={() => {
                                                modalDispash({
                                                    type: "concorrentesEnderecoManutencaoModal",
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
                                            className="btn btn-outline-primary btn-sm"
                                            classIcon="mdi mdi-pencil-circle"
                                            caption="Alterar Endereço"
                                            data-toggle="modal"
                                            data-target="#concorrentes-endereco-manutencao-modal"
                                            onClick={() => {
                                                if (!enderecoAtual) {
                                                    return;
                                                }

                                                modalDispash({
                                                    type: "concorrentesEnderecoManutencaoModal",
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
                                    data={[enderecoAtual]}
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
                            id={`contato-${id.current}`}
                        >
                            {isManutencao && (
                                <div className="d-flex mb-1 justify-content-end">

                                    {state === EnumCrudStateRecordType.INCLUIR && (
                                        <Button
                                            className="btn btn-outline-primary btn-sm"
                                            classIcon="mdi mdi-plus-circle"
                                            caption="Incluir Contato"
                                            data-toggle="modal"
                                            data-target="#concorrentes-contato-manutencao-modal"
                                            onClick={() => {
                                                modalDispash({
                                                    type: "concorrentesContatoManutencaoModal",
                                                    onSave: (contato: any) => {
                                                        atualizarContato(contato);
                                                    },
                                                    state: EnumCrudStateRecordType.INCLUIR
                                                });
                                            }}
                                        />
                                    )}

                                    {state === EnumCrudStateRecordType.ALTERAR && (
                                        <Button
                                            className="btn btn-outline-primary btn-sm"
                                            classIcon="mdi mdi-pencil-circle"
                                            caption="Alterar Contato"
                                            data-toggle="modal"
                                            data-target="#concorrentes-contato-manutencao-modal"
                                            onClick={() => {
                                                if (!contatoAtual) {
                                                    return;
                                                }

                                                modalDispash({
                                                    type: "concorrentesContatoManutencaoModal",
                                                    contato: contatoAtualState ?? contatoAtual,
                                                    onSave: (contato: any) => {
                                                        atualizarContato(contato);
                                                    },
                                                    state: EnumCrudStateRecordType.ALTERAR
                                                });
                                            }}
                                        />
                                    )}

                                </div>
                            )}
                            {temContato &&

                                <DataTable
                                    key={JSON.stringify(contatoAtual)}
                                    title="Contato"
                                    columns={[
                                        {
                                            title: "E-mail",
                                            field: "EMAIL",
                                            width: 300,
                                            type: "string"
                                        },
                                        {
                                            title: "Telefone",
                                            field: "TELEFONE",
                                            width: 180,
                                            type: "string"
                                        },
                                        {
                                            title: "Celular",
                                            field: "CELULAR",
                                            width: 180,
                                            type: "string"
                                        }
                                    ]}
                                    data={[contatoAtual]}
                                    options={{
                                        height: 200,
                                        pagination: false,
                                        layout: "fitDataFill",
                                        selectable: 1
                                    }}
                                    useRowId
                                />}
                        </TabPanel>

                    </TabContent>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default ConcorrentesDetalhes;

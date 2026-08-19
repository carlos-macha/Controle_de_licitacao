import { Fragment, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Tabs, { TabContent, TabItem, TabPanel } from "../../base/components/tab/tab";
import { InputDataValue } from "../../base/types/types";
import { IModelConcorrente } from "../../models/modelConcorrente";
import { useModalContext } from "../../hooks/useModalContext";
import Button, { Input } from "../../base/components/form/form";
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

    const contatoAtual = contatoAtualState ?? (dadosAtuais ? {
        ID: dadosAtuais.ID,
        EMAIL: dadosAtuais.EMAIL,
        TELEFONE: dadosAtuais.TELEFONE,
        CELULAR: dadosAtuais.CELULAR
    } : undefined);

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

                            <div className="row">

                                <div className="col-md-8 mb-3">
                                    <Input
                                        label="Logradouro"
                                        id="LOGRADOURO"
                                        dataModel={{
                                            data: enderecoAtual ?? {},
                                            setData: () => { }
                                        }}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <Input
                                        label="Número"
                                        id="NUMERO"
                                        dataModel={{
                                            data: enderecoAtual ?? {},
                                            setData: () => { }
                                        }}
                                        disabled
                                    />
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-5 mb-3">
                                    <Input
                                        label="Bairro"
                                        id="BAIRRO"
                                        dataModel={{
                                            data: enderecoAtual ?? {},
                                            setData: () => { }
                                        }}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-5 mb-3">
                                    <Input
                                        label="Cidade"
                                        id="CIDADE"
                                        dataModel={{
                                            data: enderecoAtual ?? {},
                                            setData: () => { }
                                        }}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-2 mb-3">
                                    <Input
                                        label="Estado"
                                        id="ESTADO"
                                        dataModel={{
                                            data: enderecoAtual ?? {},
                                            setData: () => { }
                                        }}
                                        disabled
                                    />
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-4 mb-3">
                                    <Input
                                        label="CEP"
                                        id="CEP"
                                        dataModel={{
                                            data: enderecoAtual ?? {},
                                            setData: () => { }
                                        }}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-8 mb-3">
                                    <Input
                                        label="Complemento"
                                        id="COMPLEMENTO"
                                        dataModel={{
                                            data: enderecoAtual ?? {},
                                            setData: () => { }
                                        }}
                                        disabled
                                    />
                                </div>

                            </div>
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

                            <div className="row">

                                <div className="col-md-5 mb-3">

                                    <Input
                                        label="E-mail"
                                        id="EMAIL"
                                        dataModel={{
                                            data: contatoAtual ?? {
                                                EMAIL: "",
                                                TELEFONE: "",
                                                CELULAR: ""
                                            },
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />

                                </div>

                                <div className="col-md-3 mb-3">

                                    <Input
                                        label="Telefone"
                                        id="TELEFONE"
                                        dataModel={{
                                            data: contatoAtual ?? {
                                                EMAIL: "",
                                                TELEFONE: "",
                                                CELULAR: ""
                                            },
                                            setData: () => { }
                                        }}
                                        readOnly
                                    />

                                </div>

                                <div className="col-md-3 mb-3">

                                    <Input
                                        label="Celular"
                                        id="CELULAR"
                                        dataModel={{
                                            data: contatoAtual ?? {
                                                EMAIL: "",
                                                TELEFONE: "",
                                                CELULAR: ""
                                            },
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

export default ConcorrentesDetalhes;

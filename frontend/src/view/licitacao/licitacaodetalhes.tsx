import { Fragment, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Card, { CardBody, CardHeader } from "../../base/components/card/card";
import Tabs, { TabContent, TabItem, TabPanel } from "../../base/components/tab/tab";
import { InputDataValue } from "../../base/types/types";
import { IModelLicitacao } from "../../models/modellicitacao";
import { useModalContext } from "../../hooks/useModalContext";
import { useSweetAlertContext } from "../../base/hooks/useSweetAlertContext";
import Button, { Input } from "../../base/components/form/form";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";
import DataTable from "../../base/components/datatable/datatable";
import DAO from "../../base/daos/dao";
import { IModelItemLicitacao } from "../../models/modelItemLicitacao";

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
    const [itens, setItens] = useState<IModelItemLicitacao[]>([]);
    const [itemSelecionado, setItemSelecionado] = useState<IModelItemLicitacao | undefined>();

    const { modalDispash } = useModalContext();
    const { sweetAlertdispatch } = useSweetAlertContext();

    const dao = new DAO();

    const dadosAtuais = dataModel?.data ?? data;

    useEffect(() => {

        const carregarItens = async () => {

            if (!dadosAtuais?.ID) {
                setItens([]);
                setItemSelecionado(undefined);
                return;
            }

            try {

                const resultado = await dao.List(
                    `/itens-licitacao?LICITACAO_ID=${dadosAtuais.ID}`
                );

                setItens(
                    resultado as IModelItemLicitacao[]
                );

            } catch (error) {

                console.error(
                    "Erro ao carregar itens da licitação:",
                    error
                );

                setItens([]);

            }

        };

        carregarItens();

    }, [dadosAtuais?.ID]);

    const enderecoAtual =
        enderecoAtualState ??
        (dadosAtuais
            ? {
                ID: dadosAtuais.ID,
                LOGRADOURO: dadosAtuais.LOGRADOURO,
                NUMERO: dadosAtuais.NUMERO,
                BAIRRO: dadosAtuais.BAIRRO,
                ESTADO: dadosAtuais.ESTADO,
                CEP: dadosAtuais.CEP,
                COMPLEMENTO: dadosAtuais.COMPLEMENTO
            }
            : undefined);

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
            ESTADO: endereco.ESTADO,
            CEP: endereco.CEP,
            COMPLEMENTO: endereco.COMPLEMENTO
        });

    };

    const adicionarItem = async (
        item: Partial<IModelItemLicitacao>
    ) => {

        const novoItem = {
            ...item,
            LICITACAO_ID: dadosAtuais?.ID
        };

        try {

            const resultado = await dao.Post(
                "/itens-licitacao",
                novoItem
            );

            setItens(prev => [
                ...prev,
                resultado as IModelItemLicitacao
            ]);

            sweetAlertdispatch({
                type: "show",
                props: {
                    title: "Sucesso",
                    type: "success",
                    onConfirm: () => {
                        sweetAlertdispatch({ type: "close" });
                    }
                },
                msg: "Item salvo com sucesso."
            });

        } catch (error: any) {

            sweetAlertdispatch({
                type: "show",
                props: {
                    type: "error",
                    title: "Atenção!",
                    onConfirm() {
                        sweetAlertdispatch({
                            type: "close"
                        });
                    }
                },
                msg: error.response?.data?.error ?? "Erro ao importar arquivo."
            });

        }
    };

    const alterarItem = async (
        item: Partial<IModelItemLicitacao>
    ) => {

        try {

            const resultado = await dao.Put(
                `/itens-licitacao/${item.ID}`,
                item
            );

            setItens(prev =>
                prev.map(itemAtual =>
                    itemAtual.ID === item.ID
                        ? resultado as IModelItemLicitacao
                        : itemAtual
                )
            );

            sweetAlertdispatch({
                type: "show",
                props: {
                    title: "Sucesso",
                    type: "success",
                    onConfirm: () => {
                        sweetAlertdispatch({ type: "close" });
                    }
                },
                msg: "Item alterado com sucesso."
            });

        } catch (error: any) {

            sweetAlertdispatch({
                type: "show",
                props: {
                    type: "error",
                    title: "Atenção!",
                    onConfirm() {
                        sweetAlertdispatch({
                            type: "close"
                        });
                    }
                },
                msg: error.response?.data?.error ?? "Erro ao alterar item."
            });

        }

    };

    return (
        <Fragment>

            <Card className="iq-card">

                <CardHeader className="iq-card-header p-2 border">

                    <Tabs className="nav nav-pills">

                        {/*<TabItem
                            className="nav-item"
                            classNameLink="nav-link"
                            tabPanelRef={`itens-${id.current}`}
                            selected={true}
                        >
                            Itens
                        </TabItem>*/}

                        <TabItem
                            className="nav-item"
                            classNameLink="nav-link"
                            tabPanelRef={`endereco-${id.current}`}
                            selected={true}
                        >
                            Endereço
                        </TabItem>

                    </Tabs>

                </CardHeader>

                <CardBody className="border iq-card-body">

                    <TabContent className="tab-content">

                        {/*<TabPanel
                            className="tab-pane fade"
                            show={true}
                            id={`itens-${id.current}`}
                        >

                            {isManutencao && (
                                <div className="btn-group">

                                    <Button
                                        className="btn btn-outline-primary btn-sm"
                                        classIcon="mdi mdi-plus-circle"
                                        caption="Incluir Item"
                                        data-toggle="modal"
                                        data-target="#item-licitacao-manutencao-modal"
                                        onClick={() => {

                                            setItemSelecionado(undefined);

                                            modalDispash({
                                                type: "licitacaoItemManutencaoModal",
                                                item: {
                                                    LICITACAO_ID: dadosAtuais?.ID
                                                },
                                                onSave: (
                                                    item: Partial<IModelItemLicitacao>
                                                ) => {
                                                    adicionarItem(item);
                                                },
                                                state: EnumCrudStateRecordType.INCLUIR
                                            });

                                        }}
                                    />

                                    <Button
                                        className="btn btn-outline-primary btn-sm"
                                        classIcon="mdi mdi-pencil-circle"
                                        caption="Alterar Item"
                                        data-toggle="modal"
                                        data-target={
                                            itemSelecionado
                                                ? "#item-licitacao-manutencao-modal"
                                                : ""
                                        }
                                        onClick={() => {

                                            if (!itemSelecionado) {

                                                sweetAlertdispatch({
                                                    type: "show",
                                                    props: {
                                                        type: "error",
                                                        title: "Atenção!",
                                                        onConfirm() {
                                                            sweetAlertdispatch({
                                                                type: "close"
                                                            });
                                                        }
                                                    },
                                                    msg: "Selecione um Item para edição!"
                                                });

                                                return;
                                            }

                                            modalDispash({
                                                type: "licitacaoItemManutencaoModal",
                                                item: itemSelecionado,
                                                onSave: (
                                                    item: Partial<IModelItemLicitacao>
                                                ) => {
                                                    alterarItem(item);
                                                },
                                                state: EnumCrudStateRecordType.ALTERAR
                                            });

                                        }}
                                    />

                                </div>
                            )}*/}

                            {/*<DataTable
                                key={JSON.stringify(itens)}
                                title="Itens da Licitação"
                                columns={[
                                    {
                                        title: "Código",
                                        field: "ID",
                                        width: 80,
                                        type: "integer"
                                    },
                                    {
                                        title: "Item",
                                        field: "ITEM",
                                        width: 80,
                                        type: "integer"
                                    },
                                    {
                                        title: "Descrição",
                                        field: "DESCRICAO",
                                        width: 300,
                                        type: "string"
                                    },
                                    {
                                        title: "Marca",
                                        field: "MARCA",
                                        width: 180,
                                        type: "string"
                                    },
                                    {
                                        title: "Modelo",
                                        field: "MODELO",
                                        width: 180,
                                        type: "string"
                                    },
                                    {
                                        title: "Quantidade",
                                        field: "QUANTIDADE",
                                        width: 100,
                                        type: "float"
                                    },
                                    {
                                        title: "Unidade",
                                        field: "UNIDADE",
                                        width: 100,
                                        type: "string"
                                    },
                                    {
                                        title: "Observação",
                                        field: "OBSERVACAO",
                                        width: 250,
                                        type: "string"
                                    }
                                ]}
                                data={itens}
                                options={{
                                    height: 300,
                                    pagination: false,
                                    layout: "fitDataFill",
                                    selectable: 1
                                }}
                                useRowId
                                onRowClick={(item: IModelItemLicitacao) => {
                                    setItemSelecionado(item);
                                }}
                            />

                        </TabPanel>*/}

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

                    </TabContent>

                </CardBody>

            </Card>

        </Fragment>
    );
};

export default LicitacaoDetalhes;
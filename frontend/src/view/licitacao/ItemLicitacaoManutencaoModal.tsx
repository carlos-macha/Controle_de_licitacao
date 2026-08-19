import { Fragment, useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "../../base/components/modal/modal";
import { useModalContext } from "../../hooks/useModalContext";
import { IModelItemLicitacao } from "../../models/modelItemLicitacao";
import {
    EnumCharcasetypes,
    Input,
    InputNumber,
    TextArea,
    ValidateFields
} from "../../base/components/form/form";
import { InputDataValue } from "../../base/types/types";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";

interface ItemLicitacaoManutencaoModalProps { }

const ItemLicitacaoManutencaoModal: React.FC<ItemLicitacaoManutencaoModalProps> = () => {

    const { modalState, modalDispash } = useModalContext() as any;

    const novoItem = (): Partial<IModelItemLicitacao> => ({
        ITEM: undefined,
        DESCRICAO: "",
        MARCA: "",
        MODELO: "",
        QUANTIDADE: undefined,
        UNIDADE: "",
        OBSERVACAO: ""
    });

    const [data, setData] = useState<Partial<IModelItemLicitacao>>(novoItem());

    const [validateFields] = useState(
        new ValidateFields()
    );

    const dataModel: InputDataValue<Partial<IModelItemLicitacao>> = {
        data,
        setData
    };

    useEffect(() => {

        if (
            modalState?.state === EnumCrudStateRecordType.ALTERAR &&
            modalState?.item
        ) {
            setData(modalState.item);
        } else {
            setData({
                ...novoItem(),
                LICITACAO_ID: modalState?.item?.LICITACAO_ID
            });
        }

    }, [modalState?.item, modalState?.state]);

    const onSave = () => {

        const camposObrigatorios = [
            "ITEM",
            "DESCRICAO",
            "QUANTIDADE",
            "UNIDADE"
        ];

        for (const campo of camposObrigatorios) {

            const valor =
                data[campo as keyof Partial<IModelItemLicitacao>];

            if (
                valor === undefined ||
                valor === null ||
                valor === ""
            ) {

                validateFields.validate(
                    campo,
                    valor?.toString() || ""
                );

                return;
            }
        }

        modalState.onSave(data);

        document
            .querySelectorAll(".modal-backdrop")
            .forEach(element => element.remove());

        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("padding-right");

        modalDispash({
            type: "close"
        });

    };

    return (
        <Modal
            id="item-licitacao-manutencao-modal"
            className="fade"
            largeType="large"
        >

            <ModalHeader
                showCloseTools={true}
                title={
                    modalState?.state === EnumCrudStateRecordType.ALTERAR
                        ? "Alterar Item da Licitação"
                        : "Incluir Item da Licitação"
                }
            />

            <ModalBody>

                {modalState?.type === "licitacaoItemManutencaoModal" && (

                    <Fragment>

                        <div className="row">

                            <div className="col-md-2 mb-3">

                                <InputNumber
                                    label="Item"
                                    id="ITEM"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    validations={{
                                        required: true
                                    }}
                                />

                            </div>

                            <div className="col-md-10 mb-3">

                                <TextArea
                                    label="Descrição"
                                    id="DESCRICAO"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={1000}
                                />

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-4 mb-3">

                                <Input
                                    label="Marca"
                                    id="MARCA"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    maxLength={500}
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <Input
                                    label="Modelo"
                                    id="MODELO"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    maxLength={500}
                                />

                            </div>

                            <div className="col-md-2 mb-3">

                                <InputNumber
                                    label="Quantidade"
                                    id="QUANTIDADE"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    validations={{
                                        required: true
                                    }}
                                />

                            </div>

                            <div className="col-md-2 mb-3">

                                <Input
                                    label="Unidade"
                                    id="UNIDADE"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={20}
                                />

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-12 mb-3">

                                <Input
                                    label="Observação"
                                    id="OBSERVACAO"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    maxLength={1000}
                                />

                            </div>

                        </div>

                        <div className="d-flex justify-content-end mt-3">

                            <button
                                className="btn btn-primary"
                                onClick={onSave}
                            >
                                Salvar
                            </button>

                        </div>

                    </Fragment>

                )}

            </ModalBody>

        </Modal>
    );
};

export default ItemLicitacaoManutencaoModal;
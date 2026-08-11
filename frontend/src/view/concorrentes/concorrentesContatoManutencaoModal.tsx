import { Fragment, useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "../../base/components/modal/modal";
import { useModalContext } from "../../hooks/useModalContext";
import { IModelConcorrente } from "../../models/modelConcorrente";
import { Input, InputNumber, ValidateFields } from "../../base/components/form/form";
import { InputDataValue } from "../../base/types/types";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";

interface ConcorrentesContatoManutencaoModalProps { }

const ConcorrentesContatoManutencaoModal: React.FC<ConcorrentesContatoManutencaoModalProps> = () => {
    const { modalState, modalDispash } = useModalContext() as any;

    const novoContato = (): Partial<IModelConcorrente> => ({
        EMAIL: "",
        TELEFONE: "",
        CELULAR: ""
    });

    const [data, setData] = useState<Partial<IModelConcorrente>>(novoContato());

    const [validateFields] = useState(
        new ValidateFields()
    );

    const dataModel: InputDataValue<Partial<IModelConcorrente>> = {
        data,
        setData
    };

    useEffect(() => {
        if (modalState?.contato) {
            setData(modalState.contato);
        } else {
            setData(novoContato());
        }
    }, [modalState?.contato]);

    const onSave = () => {
        const camposObrigatorios = [
            "EMAIL",
            "TELEFONE",
            "CELULAR"
        ];

        for (const campo of camposObrigatorios) {
            const valor = data[campo as keyof Partial<IModelConcorrente>] as string;

            if (!valor || valor.trim() === "") {
                validateFields.validate(
                    campo,
                    valor || ""
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
            id="concorrentes-contato-manutencao-modal"
            className="fade"
            largeType="large"
        >
            <ModalHeader
                showCloseTools={true}
                title={
                    modalState?.state === EnumCrudStateRecordType.ALTERAR
                        ? "Alterar Contato"
                        : "Incluir Contato"
                }
            />

            <ModalBody>
                {modalState?.type === "concorrentesContatoManutencaoModal" && (
                    <Fragment>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <Input
                                    label="E-mail"
                                    id="EMAIL"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={200}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Telefone"
                                    dataModel={dataModel}
                                    id="TELEFONE"
                                    format="(##) ####-####"
                                    isText
                                    isNumericString={false}
                                    validator={validateFields}
                                    validations={{
                                        required: true
                                    }}
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <InputNumber
                                    label="Celular"
                                    dataModel={dataModel}
                                    id="CELULAR"
                                    format="(##) #####-####"
                                    isText
                                    isNumericString={false}
                                    validator={validateFields}
                                    validations={{
                                        required: true
                                    }}
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

export default ConcorrentesContatoManutencaoModal;

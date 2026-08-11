import { Fragment, useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "../../base/components/modal/modal";
import { useModalContext } from "../../hooks/useModalContext";
import { IModelConcorrente } from "../../models/modelConcorrente";
import {
    DataSearchCEP,
    EnumCharcasetypes,
    Input,
    InputCEP,
    ValidateFields
} from "../../base/components/form/form";
import { InputDataValue } from "../../base/types/types";
import { EnumCrudStateRecordType } from "../../base/components/crud/enums";

interface ConcorrentesEnderecoManutencaoModalProps { }

const ConcorrentesEnderecoManutencaoModal: React.FC<ConcorrentesEnderecoManutencaoModalProps> = () => {
    const { modalState, modalDispash } = useModalContext() as any;

    const novoEndereco = (): Partial<IModelConcorrente> => ({
        CEP: "",
        LOGRADOURO: "",
        NUMERO: "",
        BAIRRO: "",
        CIDADE: "",
        ESTADO: "",
        COMPLEMENTO: ""
    });

    const [data, setData] = useState<Partial<IModelConcorrente>>(novoEndereco());

    const [validateFields] = useState(
        new ValidateFields()
    );

    const dataModel: InputDataValue<Partial<IModelConcorrente>> = {
        data,
        setData
    };

    useEffect(() => {
        if (modalState?.endereco) {
            setData(modalState.endereco);
        } else {
            setData(novoEndereco());
        }
    }, [modalState?.endereco]);

    const onSearchCEP = (cepData: DataSearchCEP) => {
        setData(prev => ({
            ...prev,
            CEP: cepData.cep,
            LOGRADOURO: cepData.logradouro,
            BAIRRO: cepData.bairro,
            CIDADE: cepData.localidade,
            ESTADO: cepData.uf,
            COMPLEMENTO: cepData.complemento
        }));
    };

    const onSave = () => {
        const camposObrigatorios = [
            "CEP",
            "LOGRADOURO",
            "NUMERO"
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
            id="concorrentes-endereco-manutencao-modal"
            className="fade"
            largeType="large"
        >
            <ModalHeader
                showCloseTools={true}
                title={
                    modalState?.state === EnumCrudStateRecordType.ALTERAR
                        ? "Alterar Endereço"
                        : "Incluir Endereço"
                }
            />

            <ModalBody>
                {modalState?.type === "concorrentesEnderecoManutencaoModal" && (
                    <Fragment>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <InputCEP
                                    label="CEP"
                                    id="CEP"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    onSearchCEP={onSearchCEP}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={9}
                                />
                            </div>

                            <div className="col-md-7 mb-3">
                                <Input
                                    label="Logradouro"
                                    id="LOGRADOURO"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={200}
                                />
                            </div>

                            <div className="col-md-2 mb-3">
                                <Input
                                    label="Número"
                                    id="NUMERO"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    validations={{
                                        required: true
                                    }}
                                    maxLength={20}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <Input
                                    label="Bairro"
                                    id="BAIRRO"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                />
                            </div>

                            <div className="col-md-5 mb-3">
                                <Input
                                    label="Cidade"
                                    id="CIDADE"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <Input
                                    label="Estado"
                                    id="ESTADO"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    maxLength={2}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <Input
                                    label="Complemento"
                                    id="COMPLEMENTO"
                                    dataModel={dataModel}
                                    validator={validateFields}
                                    charCase={EnumCharcasetypes.UPPERCASE}
                                    maxLength={100}
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

export default ConcorrentesEnderecoManutencaoModal;
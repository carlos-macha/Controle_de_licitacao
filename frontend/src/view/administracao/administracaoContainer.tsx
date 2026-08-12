import { Fragment } from "react";
import { CrudContainer } from "../../base/components/crud/container/crudcontainer";
import { CrudManutencaoEvents, CrudPesquisaEvents, CrudUrl } from "../../base/components/crud/types";
import { OperatorSearchTypes } from "../../base/components/datasearch/datasearch";
import { DataTableColumns, Formatters } from "../../base/components/datatable/datatable";
import { EnumCharcasetypes } from "../../base/components/form/form";
import AdministracaoPesquisa from "./administracaoPesquisa";
import AdministracaoManutencao from "./administracaoManutencao";

export interface AdministracaoContainerParams { }

class AdministracaoContainer extends CrudContainer {

    crudUrl = (): CrudUrl | undefined => {
        return {
            GET: '/usuarios',
            POST: '/usuarios',
            PUT: '/usuarios',
            DELETE: '/usuarios',
        };
    }

    columns = (): DataTableColumns | undefined => {
        return [
            {
                title: "Código",
                field: "ID",
                width: 100,
                isKey: true,
                type: "integer",
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 150,
                    type: "DEFAULT",
                }
            },
            {
                title: "Login",
                field: "LOGIN",
                width: 180,
                type: "string",
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 200,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Nome",
                field: "NOME",
                width: 300,
                type: "string",
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 250,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Ativo/Inativo", field: "ATIVO", width: 150, hozAlign: "left", type: 'string',
                formatter: (cell, formatterParams, onRendered) => {
                    let strValue = cell.getValue();
                    return strValue === 'A' ? 'ATIVO' : 'INATIVO';
                },
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    type: 'COMBOBOX',
                    defaultValue: '',
                    isClearable: true,
                    width: 170,
                    options: [
                        {
                            value: 'A',
                            label: 'Ativo'
                        },
                        {
                            value: 'I',
                            label: 'Inativo'
                        }
                    ]
                }
            },
            {
                title: "Data de Cadastro",
                field: "DATA_CADASTRO",
                width: 180,
                type: "date",
                formatter: Formatters.dateISO,
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 180,
                    type: "DEFAULT",
                }
            },
            {
                title: "Data de Alteração",
                field: "DATA_ALTERACAO",
                width: 180,
                type: "date",
                formatter: Formatters.dateISO,
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 180,
                    type: "DEFAULT",
                }
            },
            {
                title: "Perfil", field: "PERFIL", width: 150, hozAlign: "left", type: 'string',
                formatter: (cell, formatterParams, onRendered) => {
                    let strValue = cell.getValue();
                    return strValue === 'ADMIN' ? 'ADMIN' : 'USUÁRIO';
                },
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    type: 'COMBOBOX',
                    defaultValue: '',
                    isClearable: true,
                    width: 170,
                    options: [
                        {
                            value: 'ADMIN',
                            label: 'ADMIN'
                        },
                        {
                            value: 'USER',
                            label: 'USUÁRIO'
                        }
                    ]
                }
            },
        ];
    }

    pesquisa = (events: CrudPesquisaEvents): JSX.Element => {
        return (
            <AdministracaoPesquisa
                events={events}
            />
        );
    }

    manutencao = (events: CrudManutencaoEvents): JSX.Element => {
        return (
            <AdministracaoManutencao
                events={events} />
        )
    }
}

export default AdministracaoContainer;
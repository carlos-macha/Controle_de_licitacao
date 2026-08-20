import { Fragment } from "react";
import { CrudContainer } from "../../base/components/crud/container/crudcontainer";
import {
    CrudManutencaoEvents,
    CrudPesquisaEvents,
    CrudUrl
} from "../../base/components/crud/types";
import { DataTableColumns, Formatters } from "../../base/components/datatable/datatable";
import { EnumCharcasetypes } from "../../base/components/form/form";
import { IModelItemLicitacao } from "../../models/modelItemLicitacao";
import ItemLicitacaoPesquisa from "./itemLicitacaoPesquisa";
import ItemLicitacaoManutencao from "./itemLicitacaoManutencao";

export interface ItemLicitacaoContainerParams {
    isModal: boolean;
    onSelecionar?: (item: IModelItemLicitacao) => void;
}

class ItemLicitacaoContainer extends CrudContainer {

    crudUrl = (): CrudUrl | undefined => {
        return {
            GET: '/itens-licitacao',
            POST: '/itens-licitacao',
            PUT: '/itens-licitacao',
            DELETE: '/itens-licitacao',
        };
    }

    columns = (): DataTableColumns | undefined => {

        const columns: DataTableColumns = [
            {
                title: "Código",
                field: "ID",
                width: 60,
                isKey: true,
                type: "integer",
                visible: true,
                search: {
                    width: 150,
                    type: "DEFAULT",
                }
            },
            {
                title: "Código da Licitação",
                field: "LICITACAO_ID",
                width: 150,
                type: "integer",
                visible: false,
                search: {
                    width: 200,
                    type: "DEFAULT",
                }
            },
            {
                title: "Licitação",
                field: "LICITACAO",
                width: 240,
                type: "string",
                visible: true,
                search: {
                    width: 200,
                    type: "DEFAULT",
                }
            },
            {
                title: "Item",
                field: "ITEM",
                width: 60,
                type: "integer",
                visible: true,
                search: {
                    width: 150,
                    type: "DEFAULT",
                }
            },
            {
                title: "Marca",
                field: "MARCA",
                width: 120,
                type: "string",
                visible: true,
                search: {
                    width: 250,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Modelo",
                field: "MODELO",
                width: 120,
                type: "string",
                visible: true,
                search: {
                    width: 250,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Quantidade",
                field: "QUANTIDADE",
                width: 60,
                type: "float",
                formatter: Formatters.formatterNumber,
                visible: true,
                search: {
                    width: 200,
                    type: "DEFAULT",
                }
            },
            {
                title: "Unidade",
                field: "UNIDADE",
                width: 60,
                type: "string",
                visible: true,
                search: {
                    width: 200,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            }
        ];

        return columns;
    }

    pesquisa = (events: CrudPesquisaEvents): JSX.Element => {
        const { params } = this.props;

        return (
            <ItemLicitacaoPesquisa
                events={events}
                isModal={params.isModal}
                onBtnSelecionar={params.onSelecionar}
            />
        );
    }

    manutencao = (events: CrudManutencaoEvents): JSX.Element => {
        const { params } = this.props;

        if (params.isModal) {
            return <Fragment />;
        }

        return (
            <ItemLicitacaoManutencao
                events={events}
            />
        );
    }
}

export default ItemLicitacaoContainer;
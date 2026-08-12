import { CrudContainer } from "../../base/components/crud/container/crudcontainer";
import {
    CrudManutencaoEvents,
    CrudPesquisaEvents,
    CrudUrl
} from "../../base/components/crud/types";
import { OperatorSearchTypes } from "../../base/components/datasearch/datasearch";
import { DataTableColumns, Formatters } from "../../base/components/datatable/datatable";
import ResultadoLicitacaoPesquisa from "./resultadoLicitacaoPesquisa";
import ResultadoLicitacaoManutencao from "./resultadoLicitacaoManutencao";

export interface ResultadoLicitacaoContainerParams {
}

class ResultadoLicitacaoContainer extends CrudContainer {

    crudUrl = (): CrudUrl | undefined => {
        const { params } = this.props;

        return {
            GET: '/resultado-licitacoes',
            POST: '/resultado-licitacoes',
            PUT: '/resultado-licitacoes',
            DELETE: '/resultado-licitacoes',
        }
    }

    columns = (): DataTableColumns | undefined => {
        const { params } = this.props;

        const columns: DataTableColumns = [
            {
                title: "Código",
                field: "ID",
                width: 100,
                isKey: true,
                type: 'integer',
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 150,
                    type: "DEFAULT",
                }
            },
            {
                title: "Licitação",
                field: "CODIGO_LICITACAO",
                width: 200,
                type: 'integer',
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT"
                }
            },
            {
                title: "Concorrente",
                field: "CODIGO_CONCORRENTE",
                width: 200,
                type: 'integer',
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT"
                }
            },
            {
                title: "Produto",
                field: "CODIGO_PRODUTO",
                width: 200,
                type: 'integer',
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT"
                }
            },
            {
                title: "Preço ganho",
                field: "PRECO_GANHO",
                width: 200,
                type: 'integer',
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT"
                }
            },
            {
                title: "Data resultado",
                field: "DATA_RESULTADO",
                width: 200,
                type: 'date',
                visible: true,
                formatter: Formatters.dateISO,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT"
                }
            }
        ];

        return columns;
    }

    pesquisa = (events: CrudPesquisaEvents): JSX.Element => {
        const { params } = this.props;

        return (
            <ResultadoLicitacaoPesquisa
                events={events}
            />
        );
    }

    manutencao = (events: CrudManutencaoEvents): JSX.Element => {
        const { params } = this.props;

        return (
            <ResultadoLicitacaoManutencao
                events={events}
            />
        );
    }
}

export default ResultadoLicitacaoContainer;
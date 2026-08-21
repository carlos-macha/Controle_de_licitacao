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
import { EnumCharcasetypes } from "../../base/components/form/form";

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
                width: 60,
                isKey: true,
                type: 'integer',
                visible: true,
                search: {
                    width: 100,
                    type: "DEFAULT",
                }
            },
            {
                title: "Pregão",
                field: "LICITACAO",
                width: 240,
                type: 'string',
                visible: true,
                search: {
                    width: 180,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Município",
                field: "MUNICIPIO",
                width: 240,
                type: 'string',
                visible: true,
                search: {
                    width: 180,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Número do Item",
                field: "ITEM",
                width: 50,
                type: 'integer',
                visible: true,
                search: {
                    width: 135,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Descrição do Item",
                field: "ITEM_LICITACAO",
                width: 200,
                type: 'string',
                visible: true,
                search: {
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Nome do Concorrente",
                field: "CONCORRENTE",
                width: 200,
                type: 'string',
                visible: true,
                search: {
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Código Item",
                field: "ITEM_LICITACAO_ID",
                width: 200,
                type: 'integer',
                visible: false,
                search: {
                    width: 180,
                    type: "DEFAULT"
                }
            },
            {
                title: "Código Concorrente",
                field: "CONCORRENTE_ID",
                width: 200,
                type: 'integer',
                visible: false,
                search: {
                    width: 150,
                    type: "DEFAULT"
                }
            },
            {
                title: "Preço ganho",
                field: "PRECO_GANHO",
                width: 100,
                type: 'float',
                formatter: Formatters.formatterNumber,
                formatterParams: Formatters.money("R$"),
                visible: true,
                search: {
                    width: 150,
                    type: "DEFAULT"
                }
            },
            {
                title: "Valor Total do Lance",
                field: "VALOR_TOTAL_LANCE",
                width: 100,
                type: 'float',
                formatter: Formatters.formatterNumber,
                formatterParams: Formatters.money("R$"),
                visible: true,
                search: {
                    width: 150,
                    type: "DEFAULT"
                }
            },
            {
                title: "Valor Orçado",
                field: "VALOR_ORCADO",
                width: 100,
                type: 'float',
                formatter: Formatters.formatterNumber,
                formatterParams: Formatters.money("R$"),
                visible: true,
                search: {
                    width: 150,
                    type: "DEFAULT"
                }
            },
            {
                title: "Valor Total Orçado",
                field: "VALOR_TOTAL_ORCADO",
                width: 100,
                type: 'float',
                formatter: Formatters.formatterNumber,
                formatterParams: Formatters.money("R$"),
                visible: true,
                search: {
                    width: 150,
                    type: "DEFAULT"
                }
            },
            {
                title: "Economia Percentual",
                field: "ECONOMIA_PERCENTUAL",
                width: 70,
                type: 'float',
                formatter: Formatters.formatterPercent,
                visible: true,
                search: {
                    width: 150,
                    type: "DEFAULT"
                }
            },
            {
                title: "Economia Reais",
                field: "ECONOMIA_REAIS",
                width: 85,
                type: 'float',
                formatter: Formatters.formatterNumber,
                formatterParams: Formatters.money("R$"),
                visible: true,
                search: {
                    width: 150,
                    type: "DEFAULT"
                }
            },
            {
                title: "Data do Relatório",
                field: "DATA_RELATORIO",
                width: 100,
                type: 'date',
                visible: true,
                formatter: Formatters.dateISO,
                search: {
                    width: 150,
                    type: "DEFAULT"
                }
            },
            {
                title: "Hora do Relatório",
                field: "HORA_RELATORIO",
                width: 70,
                type: 'time',
                visible: true,
                formatter: Formatters.timeISO,
                search: {
                    width: 150,
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
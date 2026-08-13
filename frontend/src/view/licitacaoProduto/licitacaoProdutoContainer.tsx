import { CrudContainer } from "../../base/components/crud/container/crudcontainer";
import { CrudManutencaoEvents, CrudPesquisaEvents, CrudUrl } from "../../base/components/crud/types";
import { OperatorSearchTypes } from "../../base/components/datasearch/datasearch";
import { DataTableColumns, Formatters } from "../../base/components/datatable/datatable";
import LicitacaoProdutoManutencao from "./licitacaoProdutoManutencao";
import LicitacaoProdutoPesquisa from "./licitacaoProdutoPesquisa";

export interface LicitacaoProdutoContainerParams { }

class LicitacaoProdutoContainer extends CrudContainer {

    crudUrl = (): CrudUrl | undefined => {
        const { params } = this.props;

        return {
            GET: '/licitacao-produtos',
            POST: '/licitacao-produtos',
            PUT: '/licitacao-produtos',
            DELETE: '/licitacao-produtos',
        }
    }

    columns = (): DataTableColumns | undefined => {

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
                title: "Código da Licitação",
                field: "CODIGO_LICITACAO",
                width: 180,
                type: 'integer',
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 200,
                    type: "DEFAULT",
                }
            },
            {
                title: "Código do Produto",
                field: "CODIGO_PRODUTO",
                width: 180,
                type: 'integer',
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 200,
                    type: "DEFAULT",
                }
            },
            {
                title: "Quantidade",
                field: "QUANTIDADE",
                width: 150,
                type: 'integer',
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 200,
                    type: "DEFAULT",
                }
            },
            {
                title: "Valor Unitário Referência",
                field: "VALOR_UNITARIO_REFERENCIA",
                width: 220,
                type: 'integer',
                formatter: Formatters.formatterNumber,
                formatterParams: Formatters.money("R$"),
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 250,
                    type: "DEFAULT",
                }
            },
            {
                title: "Valor Total Referência",
                field: "VALOR_TOTAL_REFERENCIA",
                width: 220,
                type: 'integer',
                formatter: Formatters.formatterNumber,
                formatterParams: Formatters.money("R$"),
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 250,
                    type: "DEFAULT",
                }
            }
        ];

        return columns;
    }

    pesquisa = (events: CrudPesquisaEvents): JSX.Element => {
        return (
            <LicitacaoProdutoPesquisa
                events={events}
            />
        )
    }

    manutencao = (events: CrudManutencaoEvents): JSX.Element => {
        return (
            <LicitacaoProdutoManutencao
                events={events}
            />
        )
    }
}

export default LicitacaoProdutoContainer;
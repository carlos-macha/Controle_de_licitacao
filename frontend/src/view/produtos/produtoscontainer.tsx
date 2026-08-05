import { CrudContainer } from "../../base/components/crud/container/crudcontainer";
import { CrudManutencaoEvents, CrudPesquisaEvents, CrudUrl } from "../../base/components/crud/types";
import { OperatorSearchTypes } from "../../base/components/datasearch/datasearch";
import { DataTableColumns } from "../../base/components/datatable/datatable";
import { EnumCharcasetypes } from "../../base/components/form/form";
import ProdutosManutencao from "./produtosmanutencao";
import ProdutosPesquisa from "./produtospesquisa";

export interface ProdutosContainerParams {

}

class ProdutosContainer extends CrudContainer {

    crudUrl = (): CrudUrl | undefined => {
        const { params } = this.props;

        return {
            GET: '/produtos',
            POST: '/produtos',
            PUT: '/produtos',
            DELETE: '/produtos',
        }
    }

    columns = (): DataTableColumns | undefined => {
        const { params } = this.props;


        const columns: DataTableColumns = [
            {
                title: "Código", field: "ID", width: 100, isKey: true, type: 'integer', visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 150,
                    type: "DEFAULT",
                }
            },
            {
                title: "Código do produto", field: "CODIGO_PRODUTO", width: 200, type: 'integer', visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Marca", field: "MARCA", width: 200, type: 'string', visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Modelo", field: "MODELO", width: 200, type: 'string', visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Preço base", field: "PRECO_BASE", width: 200, type: 'integer', visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },

        ]

        return columns;
    }

    pesquisa = (events: CrudPesquisaEvents): JSX.Element => {
        const { params } = this.props;
        return (
            <ProdutosPesquisa
                events={events} />
        )
    }

    manutencao = (events: CrudManutencaoEvents): JSX.Element => {
        const { params } = this.props;
        return (
            <ProdutosManutencao
                events={events} />
        )
    }
}

export default ProdutosContainer;
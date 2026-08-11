import { CrudContainer } from "../../base/components/crud/container/crudcontainer";
import { CrudManutencaoEvents, CrudPesquisaEvents, CrudUrl } from "../../base/components/crud/types";
import { OperatorSearchTypes } from "../../base/components/datasearch/datasearch";
import { DataTableColumns } from "../../base/components/datatable/datatable";
import { EnumCharcasetypes } from "../../base/components/form/form";
import ConcorrenteManutencao from "./concorrentesManutencao";
import ConcorrentesPesquisa from "./concorrentesPesquisa";

export interface ConcorrenteContainerParams { }

class ConcorrentesContainer extends CrudContainer {

    crudUrl = (): CrudUrl | undefined => {
        return {
            GET: '/concorrentes',
            POST: '/concorrentes',
            PUT: '/concorrentes',
            DELETE: '/concorrentes',
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
                title: "Nome",
                field: "NOME",
                width: 300,
                type: 'string',
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "CNPJ",
                field: "CNPJ",
                width: 200,
                type: 'string',
                visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 200,
                    type: "DEFAULT",
                }
            }
        ];

        return columns;
    }

    pesquisa = (events: CrudPesquisaEvents): JSX.Element => {
        return (
            <ConcorrentesPesquisa
                events={events}
            />
        )
    }

    manutencao = (events: CrudManutencaoEvents): JSX.Element => {
        return (
            <ConcorrenteManutencao
                events={events}
            />
        )
    }
}

export default ConcorrentesContainer;
import { Fragment } from "react";
import { CrudContainer } from "../../base/components/crud/container/crudcontainer";
import { CrudManutencaoEvents, CrudPesquisaEvents, CrudUrl } from "../../base/components/crud/types";
import { OperatorSearchTypes } from "../../base/components/datasearch/datasearch";
import { DataTableColumns, Formatters } from "../../base/components/datatable/datatable";
import { EnumCharcasetypes } from "../../base/components/form/form";
import { IModelLicitacao } from "../../models/modellicitacao";
import LicitacaoManutencao from "./licitacaoManutencao";
import LicitacaoPesquisa from "./licitacaoPesquisa";

export interface LicitacaoContainerParams {
    isModal: boolean;
    onSelecionar?: (produto: IModelLicitacao) => void;
}

class LicitacaoContainer extends CrudContainer {

    crudUrl = (): CrudUrl | undefined => {
        const { params } = this.props;

        return {
            GET: '/licitacoes',
            POST: '/licitacoes',
            PUT: '/licitacoes',
            DELETE: '/licitacoes',
        }
    }

    formatarData = (data: string | Date): string => {
        const date = new Date(data);

        if (isNaN(date.getTime())) {
            return "";
        }

        return new Intl.DateTimeFormat("pt-BR").format(date);
    }


    columns = (): DataTableColumns | undefined => {

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
                title: "Número do Edital", field: "NUMERO_EDITAL", width: 100, type: 'integer', visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT",
                }
            },
            {
                title: "Nome", field: "NOME", width: 300, type: 'string', visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Código da Licitação", field: "CODIGO_LICITACAO", width: 150, type: 'integer', visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT",
                }
            },
            {
                title: "Orgão Competente", field: "ORGAO_COMPETENTE", width: 300, type: 'string', visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Data do Certame", field: "DATA_CERTAME", formatter: Formatters.dateISO, width: 100, type: 'date', visible: true,
                search: {
                    operator: OperatorSearchTypes.EQUAL,
                    width: 300,
                    type: "DEFAULT",
                }
            },

        ]

        return columns;
    }

    pesquisa = (events: CrudPesquisaEvents): JSX.Element => {
        const { params } = this.props;
        return (
            <LicitacaoPesquisa
                events={events}
                isModal={params.isModal}
                onBtnSelecionar={params.onSelecionar}
            />
        )
    }

    manutencao = (events: CrudManutencaoEvents): JSX.Element => {
        const { params } = this.props;

        if (params.isModal) {
            return <Fragment />;
        }

        return (
            <LicitacaoManutencao
                events={events} />
        )
    }

}

export default LicitacaoContainer;
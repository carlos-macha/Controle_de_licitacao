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
                title: "Código", field: "ID", width: 60, isKey: true, type: 'integer', visible: true,
                search: {
                    width: 100,
                    type: "DEFAULT",
                }
            },
            {
                title: "Pregão", field: "PREGAO", width: 250, type: 'string', visible: true,
                search: {
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Processo Licitatório", field: "PROCESSO_LICITATORIO", width: 200, type: 'string', visible: true,
                search: {
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Município", field: "MUNICIPIO", width: 250, type: 'string', visible: true,
                search: {
                    width: 300,
                    type: "DEFAULT",
                    charCase: EnumCharcasetypes.UPPERCASE
                }
            },
            {
                title: "Data do Certame", field: "DATA_CERTAME", formatter: Formatters.dateISO, width: 100, type: 'date', visible: true,
                search: {
                    width: 150,
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
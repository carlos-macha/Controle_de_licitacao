import { Fragment, useState } from "react";
import Crudpesquisa, { PesquisaProps } from "../../base/components/crud/pesquisa/crudpesquisa";
import { IModelConcorrente } from "../../models/modelConcorrente";
import ConcorrenteDetalhe from "./concorrentesDetalhes";

interface ConcorrentePesquisaProps extends PesquisaProps { }

const ConcorrentesPesquisa: React.FC<ConcorrentePesquisaProps> = (props) => {
    const [concorrenteSelecionado, setConcorrenteSelecionado] = useState<IModelConcorrente>();

    const limparSelecionada = () => {
        setConcorrenteSelecionado(undefined);
    };

    return (
        <Crudpesquisa
            showNewButton
            showChangeButton
            showDeleteButton
            autoLoad
            onDataChange={(data) => {
                setConcorrenteSelecionado(data);
            }}
            containerBottom={() => {
                if (!concorrenteSelecionado) {
                    return <Fragment />
                }

                return <ConcorrenteDetalhe
                    data={concorrenteSelecionado}
                />
            }}
            urlGetMount={(
                url: string,
                id: string | number,
                where: string,
                page: number,
                limit: number,
                _offset: number,
                data: any
            ) => {
                if (Number(id) > 0) {
                    return `${url}/${id}`;
                }

                const params = new URLSearchParams();

                if (data) {
                    Object.keys(data).forEach(key => {
                        const value = data[key];

                        if (value !== undefined && value !== '') {
                            params.append(key, value);
                        }
                    });
                }

                params.append("page", String(page));
                params.append("limit", String(limit));

                return `${url}?${params.toString()}`;
            }}
            events={props.events}
        />
    );
}

export default ConcorrentesPesquisa;
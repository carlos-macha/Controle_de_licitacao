import { Fragment, useState } from "react";
import Crudpesquisa, { PesquisaProps } from "../../base/components/crud/pesquisa/crudpesquisa";
import { IModelLicitacao } from "../../models/modellicitacao";
import LicitacaoDetalhe from "./licitacaoDetalhes";

interface LicitacaoPesquisaProps extends PesquisaProps {
    onBtnSelecionar?: (produto: IModelLicitacao) => void;
    isModal?: boolean;
}

const LicitacaoPesquisa: React.FC<LicitacaoPesquisaProps> = (props) => {
    const [licitacaoSelecionada, setLicitacaoSelecionada] = useState<IModelLicitacao>();

    const limparSelecionada = () => {
        setLicitacaoSelecionada(undefined);
    };

    return (
        <Crudpesquisa
            showNewButton={!props.isModal}
            showChangeButton={!props.isModal}
            showDeleteButton={!props.isModal}
            autoLoad
            onDataChange={(data) => {
                setLicitacaoSelecionada(data);

                if (data && props.onBtnSelecionar) {
                    props.onBtnSelecionar(data);
                }
            }}
            containerBottom={() => {
                if (!licitacaoSelecionada) {
                    return <Fragment />;
                }

                return (
                    <LicitacaoDetalhe
                        data={licitacaoSelecionada}
                    />
                );
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

export default LicitacaoPesquisa;
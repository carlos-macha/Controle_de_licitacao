import { Fragment, useState } from "react";
import Crudpesquisa, { PesquisaProps } from "../../base/components/crud/pesquisa/crudpesquisa";
import { IModelLicitacaoProduto } from "../../models/modelLicitacaoProduto";
import LicitacaoProdutoDetalhes from "./licitacaoProdutoDetalhes";
//import LicitacaoProdutoDetalhes from "./licitacaoProdutoDetalhes";

interface LicitacaoProdutosPesquisaProps extends PesquisaProps { }

const LicitacaoProdutosPesquisa: React.FC<LicitacaoProdutosPesquisaProps> = (props) => {
    const [licitacaoProdutoSelecionado, setLicitacaoProdutoSelecionado] = useState<IModelLicitacaoProduto>();

    return (
        <Crudpesquisa
            showNewButton
            showChangeButton
            showDeleteButton
            autoLoad
            onDataChange={(data) => {
                setLicitacaoProdutoSelecionado(data);
            }}
            containerBottom={() => {
                if (!licitacaoProdutoSelecionado) {
                    return <Fragment />
                }

                return <LicitacaoProdutoDetalhes
                    data={licitacaoProdutoSelecionado}
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

export default LicitacaoProdutosPesquisa;

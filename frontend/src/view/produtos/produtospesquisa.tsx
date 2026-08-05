import { useState } from "react";
import Crudpesquisa, { PesquisaProps } from "../../base/components/crud/pesquisa/crudpesquisa";
import { IModelProduto } from "../../models/modelProduto";
import ProdutoDetalhe from "./produtosdetalhes";

interface ProdutosPesquisaProps extends PesquisaProps { }

const ProdutosPesquisa: React.FC<ProdutosPesquisaProps> = (props) => {
    const [produtoSelecionado, setProdutoSelecionado] = useState<IModelProduto>();

    return <Crudpesquisa
        showNewButton
        showChangeButton
        showDeleteButton
        autoLoad
        onDataChange={(data) => {
            setProdutoSelecionado(data);
        }}

        containerBottom={() => (
            <ProdutoDetalhe
                data={produtoSelecionado}
            />
        )}
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
}

export default ProdutosPesquisa;
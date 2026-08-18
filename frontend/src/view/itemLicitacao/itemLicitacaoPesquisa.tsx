import { Fragment, useState } from "react";
import Crudpesquisa, { PesquisaProps } from "../../base/components/crud/pesquisa/crudpesquisa";
import { IModelItemLicitacao } from "../../models/modelItemLicitacao";
import ItemLicitacaoDetalhe from "./itemLicitacaoDetalhe";
//import ItemLicitacaoDetalhe from "./itemLicitacaoDetalhe";

interface ItemLicitacaoPesquisaProps extends PesquisaProps {
    onBtnSelecionar?: (item: IModelItemLicitacao) => void;
    isModal?: boolean;
}

const ItemLicitacaoPesquisa: React.FC<ItemLicitacaoPesquisaProps> = (props) => {
    const [itemSelecionado, setItemSelecionado] = useState<IModelItemLicitacao>();

    return (
        <Crudpesquisa
            showNewButton={!props.isModal}
            showChangeButton={!props.isModal}
            showDeleteButton={!props.isModal}
            autoLoad
            onDataChange={(data) => {
                setItemSelecionado(data);

                if (data && props.onBtnSelecionar) {
                    props.onBtnSelecionar(data);
                }
            }}
            containerBottom={() => {
                if (!itemSelecionado) {
                    return <Fragment />;
                }

                return (
                    <ItemLicitacaoDetalhe
                        data={itemSelecionado}
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

                        if (
                            value === undefined ||
                            value === null ||
                            value === ''
                        ) {
                            return;
                        }

                        params.append(key, String(value));
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

export default ItemLicitacaoPesquisa;
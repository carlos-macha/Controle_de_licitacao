import { Fragment, useState } from "react";
import Crudpesquisa, { PesquisaProps } from "../../base/components/crud/pesquisa/crudpesquisa";
import { IModelUsuario } from "../../models/modelUsuario";
import { momentUtils } from "../../base/utils/momentutils";

interface AdministracaoPesquisaProps extends PesquisaProps {
}

const AdministracaoPesquisa: React.FC<AdministracaoPesquisaProps> = (props) => {
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<IModelUsuario>();

    return (
        <Crudpesquisa
            showNewButton
            showChangeButton
            showDeleteButton
            autoLoad
            onDataChange={(data) => {
                setUsuarioSelecionado(data);
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
                        let value = data[key];

                        if (value === undefined || value === null || value === '') {
                            return;
                        }

                        if (key === 'SEARCH_DATA_CADASTRO') {
                            if (Number(value) === 0) {
                                return;
                            }

                            if (typeof value === 'number') {
                                value = momentUtils.fromOADate(value).format('YYYY-MM-DD');
                            }
                        }

                        if (key === 'SEARCH_DATA_ALTERACAO') {
                            if (Number(value) === 0) {
                                return;
                            }

                            if (typeof value === 'number') {
                                value = momentUtils.fromOADate(value).format('YYYY-MM-DD');
                            }
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
};

export default AdministracaoPesquisa;
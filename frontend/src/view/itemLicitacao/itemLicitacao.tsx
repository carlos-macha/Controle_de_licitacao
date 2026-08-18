import CrudProvider from "../../base/components/crud/context/crudcontext";
import { PageBaseProps } from "../../base/template/pagebase/pagebase";
import PageBase from "../components/pagebase/pagebase";
import ItemLicitacaoContainer from "./itemLicitacaoContainer";

export interface ItemLicitacaoProps extends PageBaseProps {}

const ItemLicitacao: React.FC<ItemLicitacaoProps> = (props) => {
    return (
        <PageBase>
            <CrudProvider>
                <ItemLicitacaoContainer
                    params={{
                        isModal: false
                    }}
                />
            </CrudProvider>
        </PageBase>
    );
}

export default ItemLicitacao;
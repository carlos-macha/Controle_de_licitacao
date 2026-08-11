import CrudProvider from "../../base/components/crud/context/crudcontext";
import { PageBase, PageBaseProps } from "../../base/template/pagebase/pagebase";
import ProdutosContainer from "./produtosContainer";

export interface ProdutosProps extends PageBaseProps { }

const Produtos: React.FC<ProdutosProps> = (props) => {
    return (
        <PageBase>
            <CrudProvider>
                <ProdutosContainer
                    params={{
                        isModal: false
                    }}
                />
            </CrudProvider>
        </PageBase>
    );
}

export default Produtos;
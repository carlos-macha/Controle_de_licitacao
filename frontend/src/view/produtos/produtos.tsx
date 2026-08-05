import CrudProvider from "../../base/components/crud/context/crudcontext";
import { PageBase, PageBaseProps } from "../../base/template/pagebase/pagebase";
import ProdutosContainer from "./produtoscontainer";

export interface ProdutosProps extends PageBaseProps {}

const Produtos: React.FC<ProdutosProps> = (props) => {
    return (
        <PageBase>
            <CrudProvider>
                <ProdutosContainer />
            </CrudProvider>
        </PageBase>
    );
}

export default Produtos;
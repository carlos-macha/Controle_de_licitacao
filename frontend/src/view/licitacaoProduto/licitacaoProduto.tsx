import CrudProvider from "../../base/components/crud/context/crudcontext";
import { PageBaseProps } from "../../base/template/pagebase/pagebase";
import PageBase from "../components/pagebase/pagebase";
import LicitacaoProdutoContainer from "./licitacaoProdutoContainer";

export interface LicitacaoProdutoProps extends PageBaseProps {}

const LicitacaoProduto: React.FC<LicitacaoProdutoProps> = (props) => {
    return (
        <PageBase>
            <CrudProvider>
                <LicitacaoProdutoContainer/>
            </CrudProvider>
        </PageBase>
    );
}

export default LicitacaoProduto;
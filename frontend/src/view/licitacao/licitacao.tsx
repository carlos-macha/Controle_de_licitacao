import CrudProvider from "../../base/components/crud/context/crudcontext";
import { PageBaseProps } from "../../base/template/pagebase/pagebase";
import PageBase from "../components/pagebase/pagebase";

export interface LicitacaoProps extends PageBaseProps {}

const Licitacao: React.FC<LicitacaoProps> = (props) => {
    return (
        <PageBase>
            <CrudProvider>

            </CrudProvider>
        </PageBase>
    );
}

export default Licitacao;
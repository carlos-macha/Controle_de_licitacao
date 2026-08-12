import CrudProvider from "../../base/components/crud/context/crudcontext";
import { PageBase, PageBaseProps } from "../../base/template/pagebase/pagebase";
import AdministracaoContainer from "./administracaoContainer";

export interface AdministracaoProps extends PageBaseProps { }

const Administracao: React.FC<AdministracaoProps> = (props) => {
    return (
        <PageBase>
            <CrudProvider>
                <AdministracaoContainer/>
            </CrudProvider>
        </PageBase>
    );
}

export default Administracao;
import CrudProvider from "../../base/components/crud/context/crudcontext";
import { PageBase, PageBaseProps } from "../../base/template/pagebase/pagebase";
import ResultadoLicitacaoContainer from "./resultadoLicitacaoContainer";

export interface ResultadoLicitacaoProps extends PageBaseProps { }

const ResultadoLicitacao: React.FC<ResultadoLicitacaoProps> = (props) => {
    return (
        <PageBase>
            <CrudProvider>
                <ResultadoLicitacaoContainer/>
            </CrudProvider>
        </PageBase>
    );
}

export default ResultadoLicitacao;
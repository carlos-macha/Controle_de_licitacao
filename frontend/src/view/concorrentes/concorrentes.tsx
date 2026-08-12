import CrudProvider from "../../base/components/crud/context/crudcontext";
import { PageBaseProps } from "../../base/template/pagebase/pagebase";
import PageBase from "../components/pagebase/pagebase";
import ConcorrentesContainer from "./concorrentesContainer";

export interface ConcorrentesProps extends PageBaseProps {}

const Concorrentes: React.FC<ConcorrentesProps> = (props) => {
    return (
        <PageBase>
            <CrudProvider>
                <ConcorrentesContainer
                    params={{
                        isModal: false
                    }}
                />
            </CrudProvider>
        </PageBase>
    );
}

export default Concorrentes;
import { useModalContext } from "../../../hooks/useModalContext";
import LicitacaoEnderecoManutencaoModal from "../../licitacao/LicitacaoEnderecoManutencaoModal";
import ConcorrentesEnderecoManutencaoModal from "../../concorrentes/concorrentesEnderecoManutencaoModal";
import ConcorrentesContatoManutencaoModal from "../../concorrentes/concorrentesContatoManutencaoModal";

const ModalRender = () => {

    const { modalState } = useModalContext();

    switch (modalState.type) {

        case "licitacaoEnderecoManutencaoModal":
            return <LicitacaoEnderecoManutencaoModal />;

        case "concorrentesEnderecoManutencaoModal":
            return <ConcorrentesEnderecoManutencaoModal />;

        case "concorrentesContatoManutencaoModal":
            return <ConcorrentesContatoManutencaoModal />;

        case "close":
        default:
            return null;
    }
};

export default ModalRender;
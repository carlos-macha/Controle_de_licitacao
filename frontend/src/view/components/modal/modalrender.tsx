import { useModalContext } from "../../../hooks/useModalContext";
import LicitacaoEnderecoManutencaoModal from "../../licitacao/LicitacaoEnderecoManutencaoModal";
import ConcorrentesEnderecoManutencaoModal from "../../concorrentes/concorrentesEnderecoManutencaoModal";
import ConcorrentesContatoManutencaoModal from "../../concorrentes/concorrentesContatoManutencaoModal";
import ItemLicitacaoManutencaoModal from "../../licitacao/ItemLicitacaoManutencaoModal";

const ModalRender = () => {

    const { modalState } = useModalContext();

    switch (modalState.type) {

        case "licitacaoEnderecoManutencaoModal":
            return <LicitacaoEnderecoManutencaoModal />;

        case "licitacaoItemManutencaoModal":
            return <ItemLicitacaoManutencaoModal />;

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
import { useModalContext } from "../../../hooks/useModalContext";
import LicitacaoEnderecoManutencaoModal from "../../licitacao/LicitacaoEnderecoManutencaoModal";


const ModalRender = ()=>{


    const {
        modalState
    } = useModalContext();



    if(
        modalState.type ===
        "licitacaoEnderecoManutencaoModal"
    ){

        return (
            <LicitacaoEnderecoManutencaoModal/>
        );

    }


    return null;

}



export default ModalRender;
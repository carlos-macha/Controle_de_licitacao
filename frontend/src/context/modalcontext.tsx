import React from "react";
import { EnumCrudStateRecordType } from "../base/components/crud/enums";


type ModalAction =

| {
    type: "close"
}

| {
    type: "licitacaoEnderecoManutencaoModal";
    endereco?: any;
    state: EnumCrudStateRecordType;
    onSave: (data:any)=>void;
}



type ModalDispatch = (
    action: ModalAction
)=>void;



type ModalState = {

    type:
    | "close"
    | "licitacaoEnderecoManutencaoModal";


    endereco?: any;

    state?: EnumCrudStateRecordType;

    onSave?: (data:any)=>void;

}



interface ModalProviderProps{
    children?:React.ReactNode;
}



export interface ModalContextProps {

    modalState:ModalState;

    modalDispash:ModalDispatch;

}



export const ModalStateContext =
React.createContext<ModalContextProps | undefined>(
    undefined
);



const ModalReducer = (
    _state:ModalState,
    action:ModalAction
):ModalState=>{


    switch(action.type){


        case "licitacaoEnderecoManutencaoModal":

            return {

                type:"licitacaoEnderecoManutencaoModal",

                endereco:action.endereco,

                state:action.state,

                onSave:action.onSave

            };



        case "close":

            return {

                type:"close"

            };



        default:

            return _state;

    }

}




const ModalProvider:React.FC<ModalProviderProps> = ({
    children
})=>{


    const [
        modalState,
        modalDispash
    ] = React.useReducer(

        ModalReducer,

        {
            type:"close"
        }

    );



    return (

        <ModalStateContext.Provider
            value={{
                modalState,
                modalDispash
            }}
        >

            {children}

        </ModalStateContext.Provider>

    );


}



export default ModalProvider;
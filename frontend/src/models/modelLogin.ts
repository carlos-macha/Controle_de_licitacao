export interface IModelLogin {

    LOGIN: string;

    SENHA: string;

}


export interface IUsuarioLogado {

    ID: number;

    LOGIN: string;

    NOME: string;

}


export interface IModelLoginResponse {

    token: string;

    usuario: IUsuarioLogado;

}
import { EnumPerfilUsuario } from "../base/enums/enums";

export interface IModelLogin {

    LOGIN: string;

    SENHA: string;

}


export interface IUsuarioLogado {

    ID: number;

    LOGIN: string;

    NOME: string;

    PERFIL: EnumPerfilUsuario;

}


export interface IModelLoginResponse {

    token: string;

    usuario: IUsuarioLogado;

}
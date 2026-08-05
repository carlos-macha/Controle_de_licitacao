import { EnumAtivoInativo } from "../base/enums/enums";

export interface IModelUsuario {
    ID: number;
    LOGIN: string;
    NOME: string;
    SENHA_HASH: string;
    ATIVO: EnumAtivoInativo;
}
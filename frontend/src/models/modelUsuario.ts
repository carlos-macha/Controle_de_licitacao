import { EnumAtivoInativo, EnumPerfilUsuario } from "../base/enums/enums";

export interface IModelUsuario {
    ID: number;
    LOGIN: string;
    NOME: string;
    SENHA_HASH: string;
    ATIVO: EnumAtivoInativo;
    DATA_CADASTRO: Date;
    DATA_ALTERACAO?: Date | null;
    PERFIL: EnumPerfilUsuario;
}
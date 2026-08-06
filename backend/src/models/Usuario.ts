export interface Usuario {
    ID?: number;
    LOGIN: string;
    NOME: string;
    SENHA_HASH: string;
    ATIVO: "S" | "N";
    DATA_CADASTRO?: Date;
    DATA_ALTERACAO?: Date;
    PERFIL: "ADMIN" | "USER";
}
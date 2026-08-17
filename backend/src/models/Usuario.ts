export interface Usuario {
    ID?: number;
    LOGIN: string;
    NOME: string;
    SENHA_HASH: string;
    ATIVO: "A" | "I";
    DATA_CADASTRO?: string;
    DATA_ALTERACAO?: string;
    PERFIL: "ADMIN" | "USER";
}

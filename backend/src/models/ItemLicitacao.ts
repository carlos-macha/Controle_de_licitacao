export interface ItemLicitacao {
    ID?: number;
    LICITACAO_ID: number;
    ITEM: number;
    DESCRICAO: string;
    MARCA?: string;
    MODELO?: string;
    QUANTIDADE: number;
    UNIDADE: string;
    OBSERVACAO: string;
}
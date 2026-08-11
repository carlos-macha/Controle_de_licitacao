export interface IModelLicitacaoProduto {
    ID: number;
    CODIGO_LICITACAO: number;
    CODIGO_PRODUTO: number;
    PRODUTO?: string;
    LICITACAO?: string;
    QUANTIDADE: number;
    VALOR_UNITARIO_REFERENCIA: number;
    VALOR_TOTAL_REFERENCIA: number;
}
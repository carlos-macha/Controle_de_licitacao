export interface IModelResultadoLicitacao {
    ID: number;
    CODIGO_LICITACAO: number;
    CODIGO_CONCORRENTE: number;
    CODIGO_PRODUTO: number;
    PRODUTO?: string;
    LICITACAO?: string;
    CONCORRENTE?: string;
    PRECO_GANHO: number;
    DATA_RESULTADO: string;
    
}
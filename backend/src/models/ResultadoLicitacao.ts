export interface ResultadoLicitacao {
  ID?: number;
  LICITACAO: number;
  ITEM_LICITACAO_ID: number;
  CONCORRENTE_ID: number;
  ITEM_LICITACAO?: string;
  CONCORRENTE?: string;
  PRECO_GANHO: number;
  VALOR_TOTAL_LANCE: number;
  VALOR_ORCADO: number;
  VALOR_TOTAL_ORCADO: number;
  ECONOMIA_PERCENTUAL: number;
  ECONOMIA_REAIS: number;
  DATA_RELATORIO: string;
  HORA_RELATORIO: string;
}
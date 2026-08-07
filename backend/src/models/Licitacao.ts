export interface Licitacao {
  ID: number;
  NUMERO_EDITAL: string;
  NOME: string;
  DESCRICAO: string;
  CODIGO_LICITACAO: string;
  ORGAO_COMPETENTE: string;
  DATA_CERTAME: string;
  LOGRADOURO: string;
  NUMERO: string;
  BAIRRO: string;
  CIDADE: string;
  ESTADO: string;
  CEP: string;
  COMPLEMENTO?: string;
}
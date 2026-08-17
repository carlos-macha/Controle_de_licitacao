export interface IModelImportacaoLicitacao {
    data_relatorio: string;
    hora_relatorio: string;
    municipio: string;
    pregao: string;
    processo_licitatorio: string;
    fornecedor: string;
    cnpj_fornecedor: string;
    item: number;
    quantidade: number;
    unidade: string;
    descricao: string;
    marca: string;
    modelo: string;
    valor_lance: number;
    total_lance: number;
    valor_orcado: number;
    total_orcado: number;
    economia_percentual: number;
    economia_reais: number;
}
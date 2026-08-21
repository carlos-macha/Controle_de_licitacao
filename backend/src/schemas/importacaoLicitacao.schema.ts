import { z } from "zod";

export const importacaoLicitacaoSchema = z.object({
    data_relatorio: z.string(),
    hora_relatorio: z.string(),
    municipio: z.string().min(1),
    pregao: z.string().min(1),
    processo_licitatorio: z.string().min(1),
    fornecedor: z.string().min(1),
    cnpj_fornecedor: z.string().min(1),
    item: z.number(),
    quantidade: z.number(),
    unidade: z.string().min(1),
    descricao: z.string().min(1),
    marca: z.string().optional(),
    modelo: z.string().optional(),
    valor_lance: z.number(),
    total_lance: z.number(),
    valor_orcado: z.number(),
    total_orcado: z.number(),
    economia_percentual: z.number(),
    economia_reais: z.number()
});

export const importacaoLicitacaoArraySchema =
    z.array(importacaoLicitacaoSchema);
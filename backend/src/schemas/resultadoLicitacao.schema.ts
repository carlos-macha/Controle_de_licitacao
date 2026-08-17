import { z } from "zod";

export const resultadoLicitacaoSchema = z.object({
    ID: z.number().int().positive().optional(),

    ITEM_LICITACAO_ID: z
        .number()
        .int()
        .positive("ID do item deve ser positivo."),

    CONCORRENTE_ID: z
        .number()
        .int()
        .positive("ID do concorrente deve ser positivo."),

    PRECO_GANHO: z
        .number()
        .nonnegative("Preço ganho não pode ser negativo."),

    VALOR_TOTAL_LANCE: z
        .number()
        .nonnegative("Valor total do lance não pode ser negativo."),

    VALOR_ORCADO: z
        .number()
        .nonnegative("Valor orçado não pode ser negativo."),

    VALOR_TOTAL_ORCADO: z
        .number()
        .nonnegative("Valor total orçado não pode ser negativo."),

    ECONOMIA_PERCENTUAL: z
        .number()
        .min(0, "Economia percentual não pode ser negativa.")
        .max(100, "Economia percentual não pode ser maior que 100."),

    ECONOMIA_REAIS: z
        .number()
        .nonnegative("Economia em reais não pode ser negativa."),

    DATA_RELATORIO: z
        .string()
        .min(1, "Data do relatório é obrigatória."),

    HORA_RELATORIO: z
        .string()
        .min(1, "Hora do relatório é obrigatória."),
});

export type ResultadoLicitacao =
    z.infer<typeof resultadoLicitacaoSchema>;

export const createResultadoLicitacaoSchema =
    resultadoLicitacaoSchema.omit({
        ID: true,
    });

export const updateResultadoLicitacaoSchema =
    createResultadoLicitacaoSchema.partial();
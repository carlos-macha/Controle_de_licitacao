import { z } from "zod";

export const resultadoLicitacaoSchema = z.object({
    ID: z.number().int().positive().optional(),

    CODIGO_LICITACAO: z
        .number()
        .int()
        .positive("Código da licitação é obrigatório."),

    CODIGO_CONCORRENTE: z
        .number()
        .int()
        .positive("Código do concorrente é obrigatório."),

    CODIGO_PRODUTO: z
        .number()
        .int()
        .positive("Código do produto é obrigatório."),

    PRECO_GANHO: z.number().positive("Preço ganho deve ser maior que zero."),

    DATA_RESULTADO: z.string().min(1, "Data do resultado é obrigatório."),
});

export type ResultadoLicitacao = z.infer<typeof resultadoLicitacaoSchema>;

export const createResultadoLicitacaoSchema = resultadoLicitacaoSchema.omit({
    ID: true,
});

export const updateResultadoLicitacaoSchema =
    createResultadoLicitacaoSchema.partial();

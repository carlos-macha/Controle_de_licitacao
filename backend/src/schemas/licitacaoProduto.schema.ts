import { z } from "zod";

export const licitacaoProdutoSchema = z.object({
    ID: z.number().int().positive().optional(),

    CODIGO_LICITACAO: z
        .number()
        .int()
        .positive("Código da licitação é obrigatório."),

    CODIGO_PRODUTO: z
        .number()
        .int()
        .positive("Código do produto é obrigatório."),

    QUANTIDADE: z.number().positive("Quantidade deve ser maior que zero."),

    VALOR_UNITARIO_REFERENCIA: z
        .number()
        .nonnegative("Valor unitário não pode ser negativo."),

    VALOR_TOTAL_REFERENCIA: z
        .number()
        .nonnegative("Valor total não pode ser negativo.")
        .optional(),
});

export type LicitacaoProduto = z.infer<typeof licitacaoProdutoSchema>;

export const createLicitacaoProdutoSchema = licitacaoProdutoSchema.omit({
    ID: true,
});

export const updateLicitacaoProdutoSchema =
    createLicitacaoProdutoSchema.partial();

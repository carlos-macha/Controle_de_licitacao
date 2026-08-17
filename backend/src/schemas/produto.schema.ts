import { z } from "zod";

export const produtoSchema = z.object({
    ID: z.number().int().positive().optional(),

    CODIGO_PRODUTO: z
        .string()
        .trim()
        .min(1, "Código do produto é obrigatório.")
        .max(30, "Código do produto deve ter no máximo 30 caracteres."),

    DESCRICAO: z
        .string()
        .trim()
        .min(1, "Descrição é obrigatória.")
        .max(200, "Descrição deve ter no máximo 200 caracteres."),

    MARCA: z
        .string()
        .trim()
        .min(1, "Marca é obrigatória.")
        .max(100, "Marca deve ter no máximo 100 caracteres."),

    MODELO: z
        .string()
        .trim()
        .min(1, "Modelo é obrigatório.")
        .max(100, "Modelo deve ter no máximo 100 caracteres."),

    PRECO_BASE: z.number().positive("Preço deve ser maior que zero."),

    OBSERVACAO: z
        .string()
        .trim()
        .max(500, "Observação deve ter no máximo 500 caracteres.")
        .optional(),
});

export type Produto = z.infer<typeof produtoSchema>;

export const createProdutoSchema = produtoSchema.omit({
    ID: true,
});

export const updateProdutoSchema = createProdutoSchema.partial();

import { z } from "zod";

export const itemLicitacaoSchema = z.object({
    ID: z.number().int().positive().optional(),

    LICITACAO_ID: z
        .number()
        .int()
        .positive("ID da licitação deve ser positivo."),

    ITEM: z
        .number()
        .int()
        .positive("Item deve ser positivo."),

    DESCRICAO: z
        .string()
        .trim()
        .min(1, "Descrição é obrigatória.")
        .max(
            1000,
            "Descrição deve possuir no máximo 1000 caracteres."
        ),

    MARCA: z
        .string()
        .trim()
        .max(
            500,
            "Marca deve possuir no máximo 500 caracteres."
        )
        .optional(),

    MODELO: z
        .string()
        .trim()
        .max(
            500,
            "Modelo deve possuir no máximo 500 caracteres."
        )
        .optional(),

    QUANTIDADE: z
        .number()
        .positive("Quantidade deve ser positiva."),

    UNIDADE: z
        .string()
        .trim()
        .min(1, "Unidade é obrigatória.")
        .max(
            20,
            "Unidade deve possuir no máximo 20 caracteres."
        ),

    OBSERVACAO: z
        .string()
        .trim()
        .max(1000, "Observação deve ter no máximo 1000 caracteres.")
        .optional(),
});

export type ItemLicitacao = z.infer<typeof itemLicitacaoSchema>;

export const createItemLicitacaoSchema =
    itemLicitacaoSchema.omit({
        ID: true,
    });

export const updateItemLicitacaoSchema =
    createItemLicitacaoSchema.partial();
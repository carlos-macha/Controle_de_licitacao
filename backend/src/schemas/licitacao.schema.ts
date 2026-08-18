import { z } from "zod";

export const licitacaoSchema = z.object({
    ID: z.number().int().positive().optional(),

    PREGAO: z
        .string()
        .trim()
        .min(1, "Pregão é obrigatório.")
        .max(100, "Pregão deve possuir no máximo 100 caracteres."),

    PROCESSO_LICITATORIO: z
        .string()
        .trim()
        .min(1, "Processo licitatório é obrigatório.")
        .max(100, "Processo licitatório deve possuir no máximo 100 caracteres."),

    MUNICIPIO: z
        .string()
        .trim()
        .min(1, "Município é obrigatório.")
        .max(100, "Município deve possuir no máximo 100 caracteres."),

    ESTADO: z
        .string()
        .trim()
        .length(2, "Estado deve possuir exatamente 2 caracteres.")
        .nullable()
        .optional(),

    DATA_CERTAME: z
        .string()
        .trim()
        .nullable()
        .optional(),

    LOGRADOURO: z
        .string()
        .trim()
        .max(150, "Logradouro deve possuir no máximo 150 caracteres.")
        .nullable()
        .optional(),

    NUMERO: z
        .string()
        .trim()
        .max(10, "Número deve possuir no máximo 10 caracteres.")
        .nullable()
        .optional(),

    BAIRRO: z
        .string()
        .trim()
        .max(100, "Bairro deve possuir no máximo 100 caracteres.")
        .nullable()
        .optional(),

    CEP: z
        .string()
        .trim()
        .max(9, "CEP deve possuir no máximo 9 caracteres.")
        .nullable()
        .optional(),

    COMPLEMENTO: z
        .string()
        .trim()
        .max(100, "Complemento deve possuir no máximo 100 caracteres.")
        .nullable()
        .optional(),
});

export type Licitacao = z.infer<typeof licitacaoSchema>;

export const createLicitacaoSchema =
    licitacaoSchema.omit({
        ID: true
    });

export const updateLicitacaoSchema =
    createLicitacaoSchema.partial();
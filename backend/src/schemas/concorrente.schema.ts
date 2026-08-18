import { z } from "zod";

export const concorrenteSchema = z.object({
    ID: z.number().int().positive().optional(),

    NOME: z
        .string()
        .trim()
        .min(1, "Nome é obrigatório.")
        .max(150, "Nome deve possuir no máximo 150 caracteres."),

    CNPJ: z
        .string()
        .trim()
        .length(14, "CNPJ deve conter 14 dígitos."),

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

    CIDADE: z
        .string()
        .trim()
        .max(100, "Cidade deve possuir no máximo 100 caracteres.")
        .nullable()
        .optional(),

    ESTADO: z
        .string()
        .trim()
        .length(2, "Estado deve possuir exatamente 2 caracteres.")
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

    EMAIL: z
        .string()
        .trim()
        .email("E-mail inválido.")
        .max(150, "E-mail deve possuir no máximo 150 caracteres.")
        .nullable()
        .optional(),

    TELEFONE: z
        .string()
        .trim()
        .max(15, "Telefone deve possuir no máximo 15 caracteres.")
        .nullable()
        .optional(),

    CELULAR: z
        .string()
        .trim()
        .max(15, "Celular deve possuir no máximo 15 caracteres.")
        .nullable()
        .optional()
});

export type Concorrente = z.infer<typeof concorrenteSchema>;

export const createConcorrenteSchema =
    concorrenteSchema.omit({
        ID: true
    });

export const updateConcorrenteSchema =
    createConcorrenteSchema.partial();
import { z } from "zod";

export const concorrenteSchema = z.object({
    ID: z
        .number()
        .int()
        .positive()
        .optional(),

    NOME: z
        .string()
        .trim()
        .min(3, "Nome é obrigatório.")
        .max(150, "Nome deve possuir no máximo 150 caracteres."),

    CNPJ: z
        .string()
        .trim()
        .length(14, "CNPJ deve conter 14 dígitos."),

    EMAIL: z
        .string()
        .trim()
        .email("E-mail inválido.")
        .max(150, "E-mail deve possuir no máximo 150 caracteres."),

    TELEFONE: z
        .string()
        .trim()
        .max(15, "Telefone deve possuir no máximo 15 caracteres."),

    CELULAR: z
        .string()
        .trim()
        .max(15, "Celular deve possuir no máximo 15 caracteres."),

    LOGRADOURO: z
        .string()
        .trim()
        .min(1, "Logradouro é obrigatório.")
        .max(150, "Logradouro deve possuir no máximo 150 caracteres."),

    NUMERO: z
        .string()
        .trim()
        .min(1, "Número é obrigatório.")
        .max(10, "Número deve possuir no máximo 10 caracteres."),

    BAIRRO: z
        .string()
        .trim()
        .min(1, "Bairro é obrigatório.")
        .max(100, "Bairro deve possuir no máximo 100 caracteres."),

    CIDADE: z
        .string()
        .trim()
        .min(1, "Cidade é obrigatória.")
        .max(100, "Cidade deve possuir no máximo 100 caracteres."),

    ESTADO: z
        .string()
        .trim()
        .length(2, "Estado deve possuir exatamente 2 caracteres."),

    CEP: z
        .string()
        .trim()
        .length(9, "CEP deve estar no formato 00000-000."),

    COMPLEMENTO: z
        .string()
        .trim()
        .max(100, "Complemento deve possuir no máximo 100 caracteres.")
        .optional()
});

export type Concorrente = z.infer<typeof concorrenteSchema>;

export const createConcorrenteSchema = concorrenteSchema.omit({
    ID: true
});

export const updateConcorrenteSchema = createConcorrenteSchema.partial();
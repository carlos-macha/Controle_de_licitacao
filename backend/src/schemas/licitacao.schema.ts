import { z } from "zod";

export const licitacaoSchema = z.object({
    ID: z.number().int().positive().optional(),

    NUMERO_EDITAL: z
        .string()
        .trim()
        .min(1, "Número do edital é obrigatório.")
        .max(30, "Número do edital deve possuir no máximo 30 caracteres."),

    NOME: z
        .string()
        .trim()
        .min(3, "Nome é obrigatório.")
        .max(100, "Nome deve possuir no máximo 100 caracteres."),

    DESCRICAO: z
        .string()
        .trim()
        .min(1, "Descrição é obrigatória.")
        .max(500, "Descrição deve possuir no máximo 500 caracteres."),

    CODIGO_LICITACAO: z
        .string()
        .trim()
        .min(1, "Código da licitação é obrigatório.")
        .max(30, "Código da licitação deve possuir no máximo 30 caracteres."),

    ORGAO_COMPETENTE: z
        .string()
        .trim()
        .min(1, "Órgão competente é obrigatório.")
        .max(150, "Órgão competente deve possuir no máximo 150 caracteres."),

    DATA_CERTAME: z.string().min(1, "Data do certame obrigatória."),

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

    CEP: z.string().trim().length(9, "CEP deve estar no formato 00000-000."),

    COMPLEMENTO: z
        .string()
        .trim()
        .max(100, "Complemento deve possuir no máximo 100 caracteres.")
        .optional(),
});

export type Licitacao = z.infer<typeof licitacaoSchema>;

export const createLicitacaoSchema = licitacaoSchema.omit({
    ID: true,
});

export const updateLicitacaoSchema = createLicitacaoSchema.partial();

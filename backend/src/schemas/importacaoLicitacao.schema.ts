import { z } from "zod";

const MAX_NUMERIC_15_2 = 9_999_999_999_999.99;
const MAX_NUMERIC_5_2 = 999.99;

export const importacaoLicitacaoSchema = z.object({

    data_relatorio: z
        .string({ error: "Data do relatório é obrigatória." })
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            "Data do relatório deve estar no formato AAAA-MM-DD."
        ),

    hora_relatorio: z
        .string({ error: "Hora do relatório é obrigatória." })
        .regex(
            /^\d{2}:\d{2}(:\d{2})?$/,
            "Hora do relatório deve estar no formato HH:MM ou HH:MM:SS."
        ),

    municipio: z
        .string({ error: "Município é obrigatório." })
        .min(1, "Município não pode ser vazio.")
        .max(100, "Município deve ter no máximo 100 caracteres."),

    pregao: z
        .string({ error: "Pregão é obrigatório." })
        .min(1, "Pregão não pode ser vazio.")
        .max(100, "Pregão deve ter no máximo 100 caracteres."),

    processo_licitatorio: z
        .string({ error: "Processo licitatório é obrigatório." })
        .min(1, "Processo licitatório não pode ser vazio.")
        .max(100, "Processo licitatório deve ter no máximo 100 caracteres."),

    fornecedor: z
        .string({ error: "Nome do fornecedor é obrigatório." })
        .min(1, "Nome do fornecedor não pode ser vazio.")
        .max(150, "Nome do fornecedor deve ter no máximo 150 caracteres."),

    cnpj_fornecedor: z
        .string({ error: "CNPJ do fornecedor é obrigatório." })
        .transform(valor => valor.replace(/\D/g, ""))
        .pipe(
            z
                .string()
                .length(14, "CNPJ do fornecedor deve conter exatamente 14 dígitos.")
        ),

    item: z
        .number({ error: "Número do item é obrigatório." })
        .int("Número do item deve ser um número inteiro.")
        .positive("Número do item deve ser maior que zero."),

    quantidade: z
        .number({ error: "Quantidade é obrigatória." })
        .positive("Quantidade deve ser maior que zero.")
        .max(999_999_999_999.999, "Quantidade excede o limite permitido."),

    unidade: z
        .string({ error: "Unidade é obrigatória." })
        .min(1, "Unidade não pode ser vazia.")
        .max(20, "Unidade deve ter no máximo 20 caracteres."),

    descricao: z
        .string({ error: "Descrição é obrigatória." })
        .min(1, "Descrição não pode ser vazia.")
        .max(1000, "Descrição deve ter no máximo 1000 caracteres."),

    marca: z
        .string()
        .max(500, "Marca deve ter no máximo 500 caracteres.")
        .optional(),

    modelo: z
        .string()
        .max(500, "Modelo deve ter no máximo 500 caracteres.")
        .optional(),

    valor_lance: z
        .number({ error: "Valor do lance é obrigatório." })
        .nonnegative("Valor do lance não pode ser negativo.")
        .max(MAX_NUMERIC_15_2, "Valor do lance excede o limite permitido."),

    total_lance: z
        .number({ error: "Valor total do lance é obrigatório." })
        .nonnegative("Valor total do lance não pode ser negativo.")
        .max(MAX_NUMERIC_15_2, "Valor total do lance excede o limite permitido."),

    valor_orcado: z
        .number({ error: "Valor orçado é obrigatório." })
        .nonnegative("Valor orçado não pode ser negativo.")
        .max(MAX_NUMERIC_15_2, "Valor orçado excede o limite permitido."),

    total_orcado: z
        .number({ error: "Valor total orçado é obrigatório." })
        .nonnegative("Valor total orçado não pode ser negativo.")
        .max(MAX_NUMERIC_15_2, "Valor total orçado excede o limite permitido."),

    economia_percentual: z
        .number({ error: "Percentual de economia é obrigatório." })
        .max(MAX_NUMERIC_5_2, "Percentual de economia excede o limite permitido (máx. 999,99)."),

    economia_reais: z
        .number({ error: "Economia em reais é obrigatória." })
        .max(MAX_NUMERIC_15_2, "Economia em reais excede o limite permitido.")

});

export const importacaoLicitacaoArraySchema =
    z.array(importacaoLicitacaoSchema);
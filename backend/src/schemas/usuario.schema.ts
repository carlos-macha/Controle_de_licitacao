import { z } from "zod";

export const usuarioSchema = z.object({
    ID: z
        .number()
        .int()
        .positive()
        .optional(),

    LOGIN: z
        .string()
        .trim()
        .min(3, "Login deve possuir no mínimo 3 caracteres.")
        .max(30, "Login deve possuir no máximo 30 caracteres."),

    NOME: z
        .string()
        .trim()
        .min(3, "Nome é obrigatório.")
        .max(100, "Nome deve possuir no máximo 100 caracteres."),

    SENHA_HASH: z
        .string()
        .min(60)
        .max(255),

    ATIVO: z
        .enum(["S", "N"])
        .default("S")
});

export const createUsuarioSchema = z.object({
    LOGIN: z
        .string()
        .trim()
        .min(3, "Login deve possuir no mínimo 3 caracteres.")
        .max(30, "Login deve possuir no máximo 30 caracteres."),

    NOME: z
        .string()
        .trim()
        .min(3, "Nome é obrigatório.")
        .max(100, "Nome deve possuir no máximo 100 caracteres."),

    SENHA: z
        .string()
        .min(6, "A senha deve possuir no mínimo 6 caracteres.")
        .max(100, "A senha deve possuir no máximo 100 caracteres.")
});

export const updateUsuarioSchema = z.object({
    LOGIN: z
        .string()
        .trim()
        .min(3, "Login deve possuir no mínimo 3 caracteres.")
        .max(30, "Login deve possuir no máximo 30 caracteres.")
        .optional(),

    NOME: z
        .string()
        .trim()
        .min(3, "Nome é obrigatório.")
        .max(100, "Nome deve possuir no máximo 100 caracteres.")
        .optional(),

    SENHA: z
        .string()
        .min(6, "A senha deve possuir no mínimo 6 caracteres.")
        .max(100, "A senha deve possuir no máximo 100 caracteres.")
        .optional(),

    ATIVO: z
        .enum(["S", "N"])
        .optional()
});

export const loginSchema = z.object({
    LOGIN: z
        .string()
        .trim()
        .min(1, "Login é obrigatório."),

    SENHA: z
        .string()
        .min(1, "Senha é obrigatória.")
});

export type Usuario = z.infer<typeof usuarioSchema>;
export type CreateUsuario = z.infer<typeof createUsuarioSchema>;
export type UpdateUsuario = z.infer<typeof updateUsuarioSchema>;
export type Login = z.infer<typeof loginSchema>;
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
        .min(3)
        .max(30),

    NOME: z
        .string()
        .trim()
        .min(3)
        .max(100),

    SENHA_HASH: z
        .string()
        .min(60)
        .max(255),

    ATIVO: z
        .enum(["A", "I"])
        .default("A"),

    PERFIL: z
        .enum(["ADMIN", "USER"])
        .default("USER"),

    DATA_CADASTRO: z
        .string()
        .optional(),

    DATA_ALTERACAO: z
        .string()
        .optional()
});


export const createUsuarioSchema = z.object({
    LOGIN: z
        .string()
        .min(3)
        .max(30),

    NOME: z
        .string()
        .min(3)
        .max(100),

    ATIVO: z
        .enum(["A", "I"])
        .optional(),

    PERFIL: z
        .enum(["ADMIN", "USER"])
        .default("USER")
});


export const updateUsuarioSchema = z.object({
    NOME: z
        .string()
        .min(3)
        .max(100)
        .optional(),

    ATIVO: z
        .enum(["A", "I"])
        .optional(),

    PERFIL: z
        .enum(["ADMIN", "USER"])
        .optional(),

    REDEFINIR_SENHA: z
        .boolean()
        .optional()
});

export const loginSchema = z.object({
    LOGIN: z.string(),
    SENHA: z.string()
});

export const atualizarNomeSchema = z.object({
    NOME: z
        .string()
        .trim()
        .min(3, "O nome deve possuir pelo menos 3 caracteres")
        .max(100, "O nome deve possuir no máximo 100 caracteres")
});

export const atualizarSenhaSchema = z.object({
    SENHA_ATUAL: z
        .string()
        .min(6)
        .max(100),
    NOVA_SENHA: z
        .string()
        .min(6)
        .max(100),
});


export type Usuario = z.infer<typeof usuarioSchema>;

export type UsuarioResponse =
    Omit<Usuario, "SENHA_HASH">;
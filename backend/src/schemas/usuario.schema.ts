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
        .enum(["S", "N"])
        .default("S")

});


export const createUsuarioSchema = z.object({
    LOGIN: z.string().min(3).max(30),
    NOME: z.string().min(3).max(100),
    SENHA: z.string().min(6).max(100)
});


export const updateUsuarioSchema = z.object({
    LOGIN: z.string().min(3).max(30).optional(),
    NOME: z.string().min(3).max(100).optional(),
    SENHA: z.string().min(6).max(100).optional(),
    ATIVO: z.enum(["S","N"]).optional()
});


export const loginSchema = z.object({

    LOGIN: z.string(),

    SENHA: z.string()

});


export type Usuario = z.infer<typeof usuarioSchema>;

export type UsuarioResponse =
    Omit<Usuario,"SENHA_HASH">;
import { z } from "zod";

export const loginSchema = z.object({
    LOGIN: z
        .string()
        .trim()
        .min(1, "Login é obrigatório."),

    SENHA: z
        .string()
        .min(1, "Senha é obrigatória.")
});
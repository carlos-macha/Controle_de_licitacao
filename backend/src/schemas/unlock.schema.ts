import z from "zod";

export const unlockSchema = z.object({
    SENHA: z.string().min(1)
});

export type Unlock = z.infer<typeof unlockSchema>;
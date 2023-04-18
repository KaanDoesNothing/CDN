import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
});

export const tokenSchema = z.string().min(10);

export const urlSchema = z.object({
    token: tokenSchema.optional(),
    url: z.string().url(),
    password: z.string().min(1).optional(),
    once: z.boolean().optional()
})

export const unlockURLSchema = z.object({
    password: z.string().min(1)
});

export const addToCollectionSchema = z.object({
    token: tokenSchema,
    collection: z.string().min(1),
    file_id: z.string().min(5)
});
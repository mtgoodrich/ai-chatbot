import type { Request, Response } from "express";
import z from "zod";

import { chatService } from "../services/chat.service";

// generic uuid for bruno: a8430066-435f-448e-ba9c-f4bd3d2295a7
const chatSchema = z.object({
    prompt: z
        .string()
        .trim()
        .min(1, "Prompt is required")
        .max(1000, "Prompt is too long. Max is 1000 characters"),
    conversationId: z.uuid(),
});

export const chatController = {
    async sendMessage(req: Request, res: Response) {
        const parseResult = chatSchema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(400).json(parseResult.error.format());
        }

        try {
            const { prompt, conversationId } = req.body;
            const response = await chatService.sendMessage(
                prompt,
                conversationId
            );

            res.json({
                message: response.message,
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to generate a response." });
        }
    },
};

import { z } from "zod";

export const CreateAndEditNote = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .min(1, "Title is required")
        .max(100, "Title should be less than 100 characters"),
});

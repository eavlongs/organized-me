import { z } from "zod";

export const CreateAndEditFolderValidationSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(1, "Name is required")
        .max(100, "Name should be less than 100 characters"),
});

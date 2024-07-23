import { z } from "zod";

export const AddTodoValdiationSchema = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .min(1, "Title is required")
        .max(100, "Title should be less than 100 characters"),
    description: z
        .string({ required_error: "Description is required" })
        .min(1, "Description is required")
        .max(500, "Description should be less than 500 characters"),
    // date minimum is today's date, and maximum is 1 year from today's
    date: z.date({ required_error: "Date is required" }).refine((date) => {
        // today's date at 00:00:00
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextYear = new Date();
        nextYear.setFullYear(today.getFullYear() + 1);
        return date >= today && date <= nextYear;
    }, "Date should be between today and 1 year from today"),

    hour: z.number().int().min(0).max(12),
    minute: z.number().int().min(0).max(59),
    ampm: z.enum(["am", "pm"]),
});

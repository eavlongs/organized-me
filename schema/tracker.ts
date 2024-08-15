import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const TrackerValidationSchema = z
    .object({
        title: z
            .string({ required_error: "Title is required" })
            .min(1, "Title is required")
            .max(30, "Title should be less than 50 characters"),
        description: z
            .string({ required_error: "Description is required" })
            .min(1, "Description is required")
            .max(500, "Description should be less than 500 characters"),
        name: z
            .string({ required_error: "Name is required" })
            .min(1, "Name is required")
            .max(30, "Name should be less than 50 characters"),
        unit: z
            .string({ required_error: "Unit is required" })
            .min(1, "Unit is required")
            .max(30, "Unit should be less than 50 characters"),
        definiteRange: z
            .tuple([z.number(), z.number()], {
                required_error: "Definite Range is required",
            })
            .refine(([startingRange, endingRange]) => {
                if (startingRange >= endingRange) {
                    throw new Error(
                        "Starting range should be less than ending range"
                    );
                }
                return true;
            }),
        integerOnly: z.boolean({
            required_error: '"Integer Only?" is required',
        }),
        sumValueOnTheSameDay: z.boolean({
            required_error: '"Sum Value If On The Same Day?" is required',
        }),
        largerBetter: z.boolean({
            required_error: '"Is Larger Better?" is required',
        }),
        validateImage: z.boolean({
            required_error: "Please confirm whether to validate image",
        }),
        image: z.any().nullable(),
    })
    .refine((obj) => {
        if (obj.validateImage) {
            if (!obj.image) {
                return false;
            }
            return ACCEPTED_IMAGE_TYPES.includes(obj.image.type);
        }
        return true;
    });

export const TrackerDataEntryValidationSchema = z.object({
    value: z.number({ required_error: "Value is required" }),
});

export function createTrackerDataEntryValidationSchema(
    definiteRange: [number, number]
) {
    return z.object({
        value: z.number({ required_error: "Value is required" }).refine(
            (value) => {
                if (value < definiteRange[0] || value > definiteRange[1]) {
                    return false;
                }
                return true;
            },
            {
                message: `Value should be between ${definiteRange[0]} and ${definiteRange[1]}`,
            }
        ),
    });
}

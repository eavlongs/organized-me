import type { SafeParseReturnType } from "zod";
import type { ValdiationError } from "./types/general";

export function extractValidationError<T>(
    parseResponse: SafeParseReturnType<T, T>
): ValdiationError[] {
    let errors: ValdiationError[] = [];
    if (!parseResponse.success) {
        let errArr: any[] = [];
        const { errors: err } = parseResponse.error;
        for (var i = 0; i < err.length; i++) {
            errArr.push({ field: err[i].path[0], message: err[i].message });
        }
        errors = errArr;
    }

    return errors;
}

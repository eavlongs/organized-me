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

export function debounce(fn: any, wait: number) {
    let timer: any;
    return function (...args: any) {
        if (timer) {
            clearTimeout(timer); // clear any pre-existing timer
        }

        // @ts-ignore
        const context: any = this; // get the current context
        timer = setTimeout(() => {
            fn.apply(context, args); // call the function if time expires
        }, wait);
    };
}

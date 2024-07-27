export type ValdiationError = {
    field: string;
    message: string;
};

export type ApiResponse = {
    success: boolean;
    message: string;
    error?: {
        [key: string]: string;
    };
    data?: {
        [key: string]: any;
    };
};

export type ToastProperty = {
    type: "success" | "error" | "neutral";
    message: string;
};

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

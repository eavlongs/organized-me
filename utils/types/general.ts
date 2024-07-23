export interface ValdiationError {
    field: string;
    message: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    error?: {
        [key: string]: string;
    };
    data?: {
        [key: string]: any;
    };
}

export interface ToastProperty {
    type: "success" | "error" | "neutral";
    message: string;
}

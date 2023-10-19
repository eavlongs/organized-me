// sign up data validation

import { AuthError } from "@supabase/supabase-js";

export interface SigninErrorType extends Object {
    email: boolean;
    supabaseError?: AuthError | null;
}

export interface SignupErrorType extends SigninErrorType {
    firstName: boolean;
    lastName: boolean;
    password: boolean;
    confirmPassword: boolean;
}

export function validateEmail(email: string): Boolean {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());
}

export function validatePassword(password: string): Boolean {
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
}

export function validateName(name: string): Boolean {
    const nameRegex = /^[A-Za-z\s'-]{2,}$/;
    return nameRegex.test(name);
}

export function comparePassword(
    password: string,
    confirmPassword: string
): Boolean {
    return password === confirmPassword;
}

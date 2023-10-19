import { supabase } from "../lib/supabase";
import { useState } from "react";
import "@/globals.css";

import * as z from "zod";
import {
    GithubLoginButton,
    GoogleLoginButton,
} from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import redCloseIcon from "@/assets/close-red.png";

const signUpSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(2, { message: "Must contain at least 2 characters" }),
        lastName: z
            .string()
            .trim()
            .min(2, { message: "Must contain at least 2 characters" }),
        email: z
            .string()
            .min(1, { message: "This field has to be filled." })
            .email("Invalid email"),
        password: z
            .string()
            .min(8, { message: "Password must contain at least 8 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password and confirm password don't match",
    });

async function loginGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
    });

    if (error) alert(error.message);
}

async function loginGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
    });

    if (error) alert(error.message);
}

function Signup() {
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const [loading, setLoading] = useState(false);
    const [supabaseError, setSupabaseError] = useState("");
    const navigate = useNavigate();

    async function submit(data: z.infer<typeof signUpSchema>) {
        setLoading(true);
        setSupabaseError("");

        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    first_name: data.firstName,
                    last_name: data.lastName,
                },
            },
        });

        if (error !== null) setSupabaseError(error.message);
        else navigate("/");
        setLoading(false);
    }

    return (
        <>
            <div className='flex items-center justify-center h-screen'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(submit)}
                        method='POST'
                        className='w-1/2 max-w-[650px] border-2 mx-auto p-6 flex flex-col gap-y-3'
                    >
                        <p className='scroll-m-20 text-xl font-semibold tracking-tight text-center'>
                            Create an Account
                        </p>

                        <FormField
                            control={form.control}
                            name='firstName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete='given-name'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='lastName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete='family-name'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='email'
                                            autoComplete='username'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            autoComplete='new-password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            autoComplete='new-password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            disabled={loading}
                            className='mt-4'
                        >
                            {loading ? "Signing Up" : "Sign Up"}
                        </Button>
                        {/* or */}
                        <div className='flex items-center'>
                            <div className='flex-grow bg bg-gray-300 h-0.5'></div>
                            <div className='flex-grow-0 mx-5 leading-7 '>
                                or
                            </div>
                            <div className='flex-grow bg bg-gray-300 h-0.5'></div>
                        </div>
                        <GoogleLoginButton
                            onClick={loginGoogle}
                            text='Continue With Google'
                            align='center'
                            disabled={loading}
                        />
                        <GithubLoginButton
                            onClick={loginGithub}
                            text='Continue With Github'
                            align='center'
                            disabled={loading}
                        />
                    </form>
                </Form>
            </div>
            {supabaseError.length !== 0 ? (
                <Alert
                    variant='destructive'
                    className='absolute top-1 right-1 w-72'
                >
                    <div className='flex justify-between'>
                        <AlertTitle>An Error Occured</AlertTitle>
                        <img
                            src={redCloseIcon}
                            alt='close icon'
                            className='w-4 h-4 cursor-pointer'
                            onClick={() => {
                                setSupabaseError("");
                            }}
                        />
                    </div>
                    <AlertDescription>{supabaseError}</AlertDescription>
                </Alert>
            ) : null}
        </>
    );
}

export default Signup;

import { supabase } from "../lib/supabase";
import { FormEvent, useEffect, useState } from "react";
import "../styles/signin-signup.scss";
import {
    SignupErrorType,
    comparePassword,
    validateEmail,
    validateName,
    validatePassword,
} from "../helper";
import {
    GithubLoginButton,
    GoogleLoginButton,
} from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";

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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<SignupErrorType>({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!comparePassword(password, confirmPassword)) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: true,
            }));
        } else
            setErrors((prev) => ({
                ...prev,
                confirmPassword: false,
            }));
    }, [confirmPassword]);

    useEffect(() => {
        if (!validatePassword(password)) {
            setErrors((prev) => ({ ...prev, password: true }));
        } else setErrors((prev) => ({ ...prev, password: false }));
    }, [password]);

    useEffect(() => {
        if (!validateEmail(email)) {
            setErrors((prev) => ({ ...prev, email: true }));
        } else setErrors((prev) => ({ ...prev, email: false }));
    }, [email]);

    async function submit(e: FormEvent) {
        e.preventDefault();

        // validation stage for name
        if (!validateName(firstName))
            setErrors((prev) => ({ ...prev, firstName: true }));
        else if (!validateName(firstName))
            setErrors((prev) => ({ ...prev, firstName: false }));

        if (!validateName(lastName))
            setErrors((prev) => ({ ...prev, lastName: true }));
        else if (!validateName(lastName))
            setErrors((prev) => ({ ...prev, lastName: false }));

        let errorRemains = false;
        for (const key in errors) {
            if (
                errors.hasOwnProperty(key) &&
                // @ts-ignore
                (errors[key] as boolean) === true
            ) {
                errorRemains = true;
                // @ts-ignore
                console.log(key, errors[key]);
                break;
            }
        }

        if (errorRemains) return;
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });

        if (error !== null)
            setErrors((prev) => ({ ...prev, supabaseError: error }));
        else navigate("/");
        setLoading(false);
    }

    return (
        <form onSubmit={submit} method='POST'>
            <h1 className='title'>Sign Up</h1>
            <div className='two-input'>
                <label htmlFor='first-name'>First Name</label>
                <label htmlFor='last-name'>Last Name</label>
                <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    required
                />
                <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    required
                />
                <span className='validation errors'>
                    {errors?.firstName
                        ? "Must contain at least 2 characters"
                        : null}
                </span>

                <span className='validation errors'>
                    {errors?.lastName
                        ? "Must contain at least 2 characters"
                        : null}
                </span>
            </div>
            <div className='one-input'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required
                />
                {email.length !== 0 ? (
                    <span
                        className={
                            "validation" +
                            (!errors?.email ? " success" : " errors")
                        }
                    >
                        Email must be a valid email
                    </span>
                ) : null}
            </div>
            <div className='one-input'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                />
                {password.length !== 0 ? (
                    <span
                        className={
                            "validation" +
                            (errors?.password ? " error" : " success")
                        }
                    >
                        Password must be longer than 8 characters
                    </span>
                ) : null}
            </div>
            <div className='one-input'>
                <label htmlFor='confirm-password'>Confirm Password</label>
                <input
                    type='password'
                    name='confirm-password'
                    id='confirm-password'
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                    required
                />
                {confirmPassword.length !== 0 ? (
                    <span
                        className={
                            "validation" +
                            (errors?.confirmPassword ? " error" : " success")
                        }
                    >
                        Password and confirm password must match
                    </span>
                ) : null}
            </div>
            <button
                type='submit'
                className={"signup-button" + (loading ? "" : " hover-darker")}
                disabled={loading}
            >
                {loading ? "Signing Up" : "Sign Up"}
            </button>
            {errors?.supabaseError ? (
                <span className='validation error supabase-error'>
                    {errors.supabaseError.message}
                </span>
            ) : null}

            <span className='separator'>or</span>
            <div className='providers'>
                <GoogleLoginButton
                    onClick={loginGoogle}
                    text='Continue With Google'
                />
                <GithubLoginButton
                    onClick={loginGithub}
                    text='Continue With Github'
                />
            </div>
        </form>
    );
}

export default Signup;

import { supabase } from "../lib/supabase";
import { FormEvent, useState } from "react";
import "../styles/signin-signup.scss";
import {
    GithubLoginButton,
    GoogleLoginButton,
} from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";
import { SigninErrorType, validateEmail } from "../helper";

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

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [passowrdVisible, setPasswordVisibility] = useState(false);
    const [errors, setErrors] = useState<SigninErrorType>({
        email: false,
    });
    const navigate = useNavigate();

    async function submit(e: FormEvent) {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrors((prev) => ({ ...prev, email: true }));
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error !== null)
            setErrors((prev) => ({ ...prev, supabaseError: error }));
        else navigate("/");
        setErrors((prev) => ({ ...prev, email: false }));
        setLoading(false);
    }

    return (
        <form onSubmit={submit} method='POST'>
            <h1 className='title'>Sign In</h1>
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
                {errors.email ? (
                    <span className='validation error'>
                        Invalid email address
                    </span>
                ) : null}
            </div>
            <div className='one-input'>
                <label htmlFor='password'>Password</label>
                <div className='password-container'>
                    <input
                        type={passowrdVisible ? "text" : "password"}
                        name='password'
                        id='password'
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                    <span
                        className='toggle-show-password'
                        onClick={() => setPasswordVisibility((prev) => !prev)}
                    >
                        {passowrdVisible ? "Hide" : "Show"}
                    </span>
                </div>
            </div>
            <button
                type='submit'
                className={"signup-button" + (loading ? "" : " hover-darker")}
                disabled={loading}
            >
                {loading ? "Signing In" : "Sign In"}
            </button>
            {errors?.supabaseError ? (
                <span className='validation error supabase-error'>
                    {errors.supabaseError?.message}
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

export default Signin;

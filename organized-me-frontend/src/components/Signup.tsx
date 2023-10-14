import { supabase } from "../lib/supabase";
import { FormEvent, useState } from "react";
import "../styles/signup.scss";

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function submit(e: FormEvent) {
        e.preventDefault();
        setSubmitted(true);

        console.log({ firstName, lastName, email, password, confirmPassword });
    }

    return (
        <form onSubmit={submit}>
            <h1 className='signup-title'>Sign Up</h1>
            <div className='two-input'>
                <label htmlFor='first-name'>First Name</label>
                <label htmlFor='last-name'>Last Name</label>
                <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
            </div>
            <div className='one-input'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>
            <div className='one-input'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <div className='one-input'>
                <label htmlFor='confirm-password'>Confirm Password</label>
                <input
                    type='password'
                    name='confirm-password'
                    id='confirm-password'
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />
            </div>
            <button type='submit' className='signup-button'>
                Sign Up
            </button>
        </form>
    );
}

export default Signup;

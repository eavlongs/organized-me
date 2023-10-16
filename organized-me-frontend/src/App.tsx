import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

interface UserType extends Object {
    id: string;
    first_name: string;
    last_name: string;
    updated_at?: Date;
    avatar_url?: string;
}

function App() {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        (async function getUser() {
            setLoading(true);
            const {
                data: { user: _user },
            } = await supabase.auth.getUser();

            if (_user !== null) {
                const { data, error } = (await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", _user.id)
                    .single()) as {
                    data: UserType | null;
                    error: PostgrestError | null;
                };

                if (error !== null) alert(error.message);
                else {
                    if (data !== null) setUser(data);
                }
            }

            setLoading(false);
        })();
    }, []);

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) alert(error);
        else {
            alert("successfully logged out");
            navigate("/signup");
        }
    }

    return loading ? (
        <h1>Loading Data</h1>
    ) : user !== null ? (
        <>
            <h1>
                Welcome back, {user.first_name} {user.last_name}
            </h1>
            <button onClick={signOut}>sign out</button>
        </>
    ) : (
        <>
            <h1>Not Logged In</h1>
            <button
                onClick={() => {
                    navigate("/signup");
                }}
            >
                sign up
            </button>
            <button
                onClick={() => {
                    navigate("/signin");
                }}
            >
                sign in
            </button>
        </>
    );
}

export default App;

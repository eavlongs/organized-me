import { generateCodeVerifier, generateState } from "arctic";
import { google } from "~/server/utils/arctic";

export default defineEventHandler(async (event) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"],
    });

    setCookie(event, "google_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
    });

    setCookie(event, "codeVerifier", codeVerifier, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
    });
    return sendRedirect(event, url.toString());
});

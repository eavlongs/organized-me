import { OAuth2RequestError } from "arctic";
import { google } from "~/server/utils/arctic";
import { apiUrl, lucia } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const code = query.code?.toString() ?? null;
    const state = query.state?.toString() ?? null;
    const storedState = getCookie(event, "google_oauth_state") ?? null;
    const codeVerifier = getCookie(event, "codeVerifier") ?? null;
    if (
        !code ||
        !state ||
        !storedState ||
        state !== storedState ||
        !codeVerifier
    ) {
        throw createError({
            status: 400,
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(
            code,
            codeVerifier
        );
        const googleUserResponse = await fetch(
            "https://openidconnect.googleapis.com/v1/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            }
        );

        const googleUser: GoogleUser = await googleUserResponse.json();

        const response = await fetch(`${apiUrl}/users/login/provider`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                providerType: "google",
                providerId: googleUser.sub,
                email: googleUser.email,
                firstName: googleUser.given_name,
                lastName: googleUser.family_name,
                avatarUrl: googleUser.picture,
            }),
        });

        const json = await response.json();
        const userId = json.data.user.id;

        const session = await lucia.createSession(userId, {});
        appendHeader(
            event,
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
        );
        return sendRedirect(event, "/");
    } catch (e: any) {
        console.log(e.message);
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            throw createError({
                status: 400,
            });
        }
        throw createError({
            status: 500,
        });
    }
});

interface GoogleUser {
    sub: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
}

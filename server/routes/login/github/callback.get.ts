import { OAuth2RequestError } from "arctic";
import { github } from "~/server/utils/arctic";
import { apiUrl, lucia } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const code = query.code?.toString() ?? null;
    const state = query.state?.toString() ?? null;
    const storedState = getCookie(event, "github_oauth_state") ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        throw createError({
            status: 400,
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });

        const githubUser: GitHubUser = await githubUserResponse.json();
        console.log(githubUser);

        const response = await fetch(`${apiUrl}/users/login/provider`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                providerType: "github",
                providerId: githubUser.id,
                email: githubUser.login,
                firstName: githubUser.name,
                lastName: null,
                avatarUrl: githubUser.avatar_url,
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

interface GitHubUser {
    id: string;
    login: string;
    name: string;
    avatar_url: string;
}

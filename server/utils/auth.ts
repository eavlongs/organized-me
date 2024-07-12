// server/utils/auth.ts
import { Lucia } from "lucia";
import CustomAdapter from "./CustomAdapter";

const customAdapter = new CustomAdapter();

export const apiUrl = process.env.API_URL;

export const lucia = new Lucia(customAdapter, {
    sessionCookie: {
        // IMPORTANT!
        attributes: {
            // set to `true` when using HTTPS
            secure: !process.dev,
        },
    },
});

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
    }
}

// server/utils/auth.ts
import { Lucia } from "lucia";
import CustomAdapter from "./CustomAdapter";

export const apiUrl = process.env.API_URL as string;

const customAdapter = new CustomAdapter();

export const lucia = new Lucia(customAdapter, {
    sessionCookie: {
        // IMPORTANT!
        attributes: {
            // set to `true` when using HTTPS
            // secure: process.env.NODE_ENV === "production",
            secure: false,
        },
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            id: attributes.id,
            email: attributes.email,
            firstName: attributes.firstName,
            lastName: attributes.lastName,
            avatarUrl: attributes.avatarUrl,
        };
    },
});

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
    }
}

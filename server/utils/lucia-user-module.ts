import { lucia } from "./auth";

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    id: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
}

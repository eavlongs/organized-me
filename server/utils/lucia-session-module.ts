import { lucia } from "./auth";

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseSessionAttributes: DatabaseSessionAttributes;
    }

    interface DatabaseSessionAttributes {
        id: string;
        user_id: string;
        expires_at: Date;
        created_at: Date;
        updated_at: Date;
    }
}

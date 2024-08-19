import { lucia } from "./auth";

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    id: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
    featureVisibility: number[];

    email: string;
    providerType: string;
    providerId: string;
    createdAt: Date;
    updatedAt: Date;

    // attributes: any;
}

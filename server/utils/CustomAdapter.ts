import { DatabaseSession, DatabaseUser, UserId } from "lucia";
import { apiUrl } from "./auth";

// https://github.com/lucia-auth/lucia/blob/main/packages/adapter-mongodb/src/index.ts
export default class CustomAdapter {
    constructor() {}

    public async getSessionAndUser(
        sessionId: string
    ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
        try {
            const response = await fetch(`${apiUrl}/sessions/${sessionId}`);
            const json = await response.json();

            if (!response.ok) {
                return [null, null];
            }

            const session = json.data.session as DatabaseSession;
            const user = json.data.user as DatabaseUser;

            user.attributes = { ...user } as any;

            const expiresAt = json.data.session.expiresAt as string;

            const expiresAtAsDate = new Date(expiresAt);
            session.expiresAt = expiresAtAsDate;

            return [session, user];
        } catch (err: any) {
            console.log({ err });
            return [null, null];
        }
    }

    public async getUserSessions(userId: UserId): Promise<DatabaseSession[]> {
        try {
            const response = await fetch(`${apiUrl}/users/${userId}/sessions`);

            if (!response.ok) {
                return [];
            }

            const json = await response.json();

            return json.data.sessions;
        } catch (err: any) {
            return [];
        }
    }
    public async setSession(session: DatabaseSession): Promise<void> {
        const response = await fetch(`${apiUrl}/sessions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(session),
        });

        if (!response.ok) {
            throw new Error("Failed to set session");
        }

        return;
    }

    public async updateSessionExpiration(
        sessionId: string,
        expiresAt: Date
    ): Promise<void> {
        const response = await fetch(`${apiUrl}/sessions/${sessionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ expiresAt }),
        });

        if (!response.ok) {
            throw new Error("Failed to update session expiration");
        }

        return;
    }

    public async deleteSession(sessionId: string): Promise<void> {
        const response = await fetch(`${apiUrl}/sessions/${sessionId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete session");
        }

        return;
    }

    public async deleteUserSessions(userId: UserId): Promise<void> {
        const response = await fetch(`${apiUrl}/sessions/${userId}/sessions`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete user sessions");
        }

        return;
    }

    public async deleteExpiredSessions(): Promise<void> {
        const response = await fetch(`${apiUrl}/sessions/expired`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete expired sessions");
        }

        return;
    }
}

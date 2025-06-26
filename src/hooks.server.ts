import Credentials from "@auth/core/providers/credentials";
import { SvelteKitAuth } from "@auth/sveltekit";
import { type UserInfo } from "remult";
import { sequence } from "@sveltejs/kit/hooks";
import { api as handleRemult } from "./server/api";

const validUsers: UserInfo[] = [
    { id: "1", name: "Jane", roles: ["admin"] },
    { id: "2", name: "Steve" },
];

export const { handle: handleAuth } = SvelteKitAuth({
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                name: {
                    placeholder: "Name",
                },
                password: {
                    placeholder: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials) =>
                validUsers.find((user) => user.name === credentials?.name) || null,
        }),
    ],
    callbacks: {
        session: ({ session, token }) => ({
            ...session,
            user: validUsers.find((user) => user.id === token?.sub),
        }),
    },
});

export const handle = sequence(handleAuth, handleRemult);

import type { Provider } from "@auth/core/providers";
import Credentials from "@auth/core/providers/credentials";
import { remult } from "remult";
import GitHub from "@auth/core/providers/github";
import { SvelteKitAuth } from "@auth/sveltekit";
import { User } from "./shared/User";
import { userController } from "./shared/UserController";
import { api } from "./server/api";

const providers: Provider[] = [
    Credentials({
        authorize: async (credentials, event) => {
            console.log("Credentials received:", credentials);
            const user: User | null = await userController.getUserData(
                credentials?.username as string,
                credentials?.password as string
            );
            console.log("User found:", user);
            return user || null;
        },
    }),
    GitHub,
];

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider();
        return { id: providerData.id, name: providerData.name };
    } else {
        return { id: provider.id, name: provider.name };
    }
});

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers,
    pages: {
        signIn: "account/login",
    },
    callbacks: {
        session: ({ session, token }) => ({
            ...session,
            // user: validUsers.find((user) => user.id === token?.sub),
        }),
    },
});

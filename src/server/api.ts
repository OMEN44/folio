import { remultApi } from "remult/remult-sveltekit";
import { Folder } from "../shared/Folder";
import { Note } from "../shared/Note";
import { Spotlight } from "../shared/Spotlight";
import { Project } from "../shared/Project";
import { User } from "../shared/User";
import type { UserInfo } from "remult";
import { auth } from "$lib/auth";
import { BetterAuthError } from "better-auth";
import { authClient } from "$lib/auth-client";

export const api = remultApi({
    entities: [Folder, Note, Project, Spotlight, User],
    admin: true,
    getUser: async (event) => {
        const session = authClient.useSession();
        console.log(session.value?.data?.user);

        return session.value?.data?.user as UserInfo;
    },
});

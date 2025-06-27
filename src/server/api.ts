import { remultApi } from "remult/remult-sveltekit";
import { Folder } from "../shared/Folder";
import { Note } from "../shared/Note";
import { Spotlight } from "../shared/Spotlight";
import { Project } from "../shared/Project";
import { User } from "../shared/User";
import type { UserInfo } from "remult";
import { userController } from "../shared/UserController";

export const api = remultApi({
    entities: [Folder, Note, Project, Spotlight, User],
    controllers: [userController],
    admin: true,
    getUser: async (event) => {
        const auth = await event.locals.auth();
        return auth?.user as UserInfo;
    },
});

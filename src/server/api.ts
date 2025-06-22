import { remultApi } from "remult/remult-sveltekit";
import { Folder } from "../shared/Folder";
import { Note } from "../shared/Note";
import { Spotlight } from "../shared/Spotlight";
import { Project } from "../shared/Project";
import { User } from "../shared/User";

export const api = remultApi({
    entities: [Folder, Note, Project, Spotlight, User],
    admin: true,
});

import { Allow, Entity, Fields, Relations } from "remult";
import { Folder } from "./Folder";
import { User } from "./User";

@Entity("notes", {
    allowApiCrud: Allow.authenticated,
})
export class Note {
    @Fields.cuid()
    id!: string;

    @Fields.string()
    title!: string;

    @Fields.string()
    content!: string;

    @Fields.boolean()
    isPublic!: boolean;

    @Fields.json()
    tags!: string[];

    @Fields.json()
    imageUrls!: string[];

    @Relations.toOne(() => Folder)
    parentFolder?: Folder;

    @Relations.toOne(() => User)
    owner?: User;
}

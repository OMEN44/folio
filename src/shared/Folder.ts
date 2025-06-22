import { Allow, Entity, Fields, Relations } from "remult";
import { User } from "./User";

@Entity("folders", {
    allowApiCrud: Allow.authenticated,
})
export class Folder {
    @Fields.cuid()
    id!: string;

    @Fields.string()
    title!: string;

    @Fields.boolean()
    isPublic!: boolean;

    @Relations.toOne(() => User)
    owner?: User;

    @Relations.toOne(() => Folder)
    parent?: Folder;

    @Relations.toMany(() => Folder)
    children?: Folder[];
}

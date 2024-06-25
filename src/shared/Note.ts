import { Entity, Fields, Relations } from "remult";
import { Account } from "./Account";
import { NoteFolder } from "./NoteFolder";

@Entity("note", {
    allowApiCrud: true,
})
export class Note {
    @Fields.cuid()
    id = "";

    @Fields.boolean()
    public = false;

    @Fields.string()
    title = "";

    @Fields.string()
    content = "";

    @Fields.updatedAt()
    lastEdit = new Date();

    @Fields.createdAt()
    createdAt = new Date();

    @Relations.toOne(() => Account)
    author?: Account;

    @Relations.toOne(() => NoteFolder)
    parent?: NoteFolder;
}

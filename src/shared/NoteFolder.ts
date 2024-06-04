import { Entity, Fields, Relations } from "remult";
import { Account } from "./Account";

@Entity("noteFolder", {
    allowApiCrud: true,
})
export class NoteFolder {
    @Fields.cuid()
    id = "";

    @Relations.toOne(() => Account)
    account?: Account;

    @Fields.string()
    title = "";

    @Fields.boolean()
    public = false;
}

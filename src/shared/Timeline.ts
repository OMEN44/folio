import { Entity, Fields, Relations } from "remult";
import { Image } from "./Image";
import { Note } from "./Note";

@Entity("timeline", {
    allowApiCrud: true,
    allowApiDelete: "0",
    allowApiInsert: "0",
    allowApiUpdate: "0",
})
export class Timeline {
    @Fields.cuid()
    id = "";

    @Fields.string()
    title = "";

    @Fields.string()
    content = "";

    @Fields.string()
    url?: string | null;

    @Fields.dateOnly()
    date = new Date();

    @Fields.json()
    tags: string[] = [];

    // link to images
    @Relations.toOne(() => Image)
    image?: Image;

    // link to notes
    @Relations.toOne(() => Note)
    note?: Note;
}

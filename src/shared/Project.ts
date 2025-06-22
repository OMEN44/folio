import { Allow, Entity, Fields, Relations } from "remult";
import { Note } from "./Note";

@Entity("projects", {
    allowApiCrud: Allow.authenticated,
})
export class Project {
    @Fields.cuid()
    id!: string;

    @Fields.string()
    title!: string;

    @Fields.dateOnly()
    startDate!: Date;

    @Fields.string()
    description!: string;

    @Fields.string()
    imageUrl!: string;

    @Fields.string()
    url!: string;

    @Fields.number()
    importance!: number;

    @Fields.json()
    tags!: string[];

    @Relations.toOne(() => Note)
    note?: Note;
}

import { Allow, Entity, Fields, Relations } from "remult";
import { Project } from "./Project";

@Entity("spotlights", {
    allowApiCrud: Allow.authenticated,
})
export class Spotlight {
    @Fields.number()
    id!: number;

    @Relations.toOne(() => Project)
    project?: Project;
}

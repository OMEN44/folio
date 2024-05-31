import { Entity, Fields, Relations } from "remult";
import { Timeline } from "./Timeline";

@Entity('spotlight', {
    allowApiCrud: true
})
export class Spotlight {
    @Fields.number()
    priority = 0

    @Relations.toOne(() => Timeline)
    timeline?: Timeline
}
import { Entity, Fields, Validators } from "remult";

@Entity('image', {
    allowApiCrud: true
})
export class Image {
    @Fields.string<Image>({
        validate: Validators.unique()
    })
    path = ""

    @Fields.string()
    label = ""
}
import { Allow, Entity, Fields } from "remult";

@Entity("users", {
    allowApiCrud: true,
})
export class User {
    @Fields.cuid()
    id!: string;

    @Fields.string()
    name!: string;

    @Fields.string()
    email!: string;

    @Fields.string()
    password!: string;

    @Fields.string()
    role!: string[];

    @Fields.string()
    theme!: string;
}

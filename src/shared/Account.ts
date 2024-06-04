import { Allow, Entity, Fields, Validators } from "remult";

@Entity("account", {
    allowApiCrud: Allow.authenticated,
    allowApiInsert: "0",
    allowApiUpdate: "0",
    allowApiDelete: "0",
})
export class Account {
    @Fields.cuid()
    id = "";

    @Fields.string<Account>({
        validate: Validators.minLength(3),
    })
    username = "";

    @Fields.string()
    email = "";

    @Fields.string()
    password = "";

    @Fields.number<Account>({
        defaultValue: () => 3,
    })
    access = 3;

    @Fields.createdAt()
    createdAt = new Date();
}

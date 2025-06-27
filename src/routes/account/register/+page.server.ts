import type { Actions } from "@sveltejs/kit";
import { remult } from "remult";
import { User } from "../../../shared/User";
import { signIn } from "../../../auth";

export const actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const users = remult.repo(User);

        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (await users.findFirst({ email: email })) {
            return {
                success: false,
                message: "Email already exists",
            };
        }

        if (password !== formData.get("confirm")) {
            return {
                success: false,
                message: "Passwords do not match",
            };
        }

        const user = await users.insert({
            email: email,
            password: password,
            name: username,
            theme: "good",
        });

        signIn(event);

        return {
            success: true,
        };
    },
} satisfies Actions;

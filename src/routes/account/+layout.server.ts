import { authClient } from "$lib/auth-client";
import { remult } from "remult";
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async () => {
    if (!remult.authenticated()) {
        throw redirect(303, "/account/login");
    }

    return {
        user: remult.user,
    };
};

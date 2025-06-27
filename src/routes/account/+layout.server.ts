import { remult } from "remult";
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async (event) => {
    if (!remult.authenticated() && event.url.pathname === "/account") {
        throw redirect(303, "/account/login");
    }

    return {
        user: remult.user,
    };
};

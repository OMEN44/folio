import { auth } from "$lib/auth";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { api as handleRemult } from "./server/api";

const betterAuth: Handle = ({ event, resolve }) => {
    return svelteKitHandler({ event, resolve, auth });
};

export const handle = sequence(betterAuth, handleRemult);

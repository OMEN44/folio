import { remultAdapter } from "@nerdfolio/remult-better-auth";
import { betterAuth } from "better-auth";
import { api } from "../server/api";
import { User, Account, Session, Verification } from "../shared/User"; // generated via the cli

export const auth = betterAuth({
    database: remultAdapter(api.getRemult(), {
        authEntities: { User, Account, Session, Verification },
    }),
    emailAndPassword: {
        enabled: true,
    },
});

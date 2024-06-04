import router from "../../plugins/router";
import { CommandType } from "./Command";
import { prefix } from "../terminal";

export const cdCommand: CommandType = {
    label: "cd",
    onCommand: (args: Array<string>) => {
        if (args.length === 1) return;
        if (["timeline", "home", "notes"].includes(args[1])) {
            router.push({ name: args[1] });
            prefix.value.directory = `/${args[1]}`;
        } else {
            return { value: `cd: No such file or directory '${args[1]}'` };
        }
    },
};

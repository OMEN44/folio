import { getActivePrefix, type CommandType, type PrefixType } from "../terminal.svelte";

export const ping: CommandType = {
    label: "ping",
    help: "Check the server's responsiveness.",
    aliases: ["p", "pp"],
    execute: async () => {
        return {
            prefix: getActivePrefix(false) as PrefixType,
            output: "Pong! The server is responsive.",
        };
    },
};

export const pong: CommandType = {
    label: "pong",
    help: "Check the server's responsiveness.",
    execute: async () => {
        return {
            prefix: getActivePrefix(false) as PrefixType,
            output: "Pong! The output",
        };
    },
};

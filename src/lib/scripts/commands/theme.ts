import type { CommandType } from "../terminal.svelte";

export const theme: CommandType = {
    label: "theme",
    help: "Change the terminal theme.",
    aliases: ["th", "t"],
    adminOnly: false,
    execute: async (args) => {
        if (args.length === 0) {
            return {
                output: "Usage: theme <theme-name>",
            };
        }

        const validThemes = ["good", "evil", "purple"];
        if (!validThemes.includes(args[0])) {
            return {
                output: `Invalid theme. Available themes: ${validThemes.join(", ")}`,
            };
        }

        // Change css variables based on the theme
        const root = document.documentElement;
        if (args[0] === "good") {
            root.style.setProperty("--background", "#1a1a1b");
            root.style.setProperty("--primary", "#7dfdfe");
            root.style.setProperty("--primary-a", "#7dfefe52");
            root.style.setProperty("--primary-b", "#2a383a");
            root.style.setProperty("--text", "#d0d0d0");
        } else if (args[0] === "evil") {
            root.style.setProperty("--background", "#1a1a1b");
            root.style.setProperty("--primary", "#ff4d4d");
            root.style.setProperty("--primary-a", "#ff4d4d52");
            root.style.setProperty("--primary-b", "#ff4d4d20");
            root.style.setProperty("--text", "#d0d0d0");
        } else if (args[0] === "purple") {
            root.style.setProperty("--background", "#1a1a1b");
            root.style.setProperty("--primary", "#a855f7");
            root.style.setProperty("--primary-a", "#a855f752");
            root.style.setProperty("--primary-b", "#a855f720");
            root.style.setProperty("--text", "#d0d0d0");
        }

        return {
            output: `Theme changed to ${args[0]}.`,
        };
    },
};

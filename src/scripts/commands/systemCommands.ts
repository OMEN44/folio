import router from "../../plugins/router";
import { CommandType } from "./Command";
import { prefix, showTerminal } from "../terminal";
import { remult } from "remult";
import { Spotlight } from "../../shared/Spotlight";

export const spotlightCommand: CommandType = {
    label: "spotlight",
    onCommand: async (args: Array<string>) => {
        // check permissions
        if (args.length === 1) {
            const spotlightProjects: Spotlight[] = await remult.repo(Spotlight).find({ include: { timeline: true } });
            let output = "![bold][Current events under the spotlight:]";
            spotlightProjects.forEach((project) => {
                output = `${output}\n${project.priority}. ${project.timeline?.title} ![italics][(id: ${project.timeline?.id})]`;
            });
            return { value: output };
        }
        if (["timeline", "home", "notes"].includes(args[1])) {
            router.push({ name: args[1] });
            prefix.value.directory = `/${args[1]}`;
        } else {
            return { value: `cd: No such file or directory '${args[1]}'` };
        }
    },
};

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

export const exitCommand: CommandType = {
    label: "exit",
    onCommand: () => {
        showTerminal.value = false;
        return undefined;
    },
};

export const whoamiCommand: CommandType = {
    label: "whoami",
    onCommand: () => {
        if (!remult.authenticated()) return { value: "Error: unknown user" };
        else
            return {
                value: `Logged in as ![bold][${remult.user?.name}]\n![italics][Access level: ${remult.user?.roles}]`,
            };
    },
};

export const lsCommand: CommandType = {
    label: "ls",
    onCommand: () => {
        if (["/home", "/timeline"].includes(prefix.value.directory)) return undefined;
        return {
            value: "Folders are ![blue][blue] and notes are ![green][green] \n ![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t![blue][folder]\t\t",
        };
    },
};

export const themeCommand: CommandType = {
    label: "theme",
    onCommand: (args: string[]) => {
        if (args.length === 1) return { value: "![bold][Available themes are:]\n![blue][Good]\t![orange][Evil]" };
        else
            switch (args[1].toLowerCase()) {
                case "good":
                    document.body.style.setProperty("--blue", "#7DFDFE");
                    document.body.style.setProperty("--blue-alt", "#22AFCA");
                    document.body.style.setProperty("--blue-background", "#7DFDFE27");
                    break;
                case "evil":
                    document.body.style.setProperty("--blue", "#FF831F");
                    document.body.style.setProperty("--blue-alt", "#b95300");
                    document.body.style.setProperty("--blue-background", "#FF831F27");
                    break;
                default:
                    return { value: `theme: No theme found with name '${args[1]}'` };
            }
        return undefined;
    },
};

export const testCommand: CommandType = {
    label: "test",
    onCommand: () => {
        return {
            value: `User Auth:\t\t${remult.authenticated()}\nUser Info:\t\t{ id: ${remult.user?.id}, name: ${
                remult.user?.name
            }, roles: ${remult.user?.roles} }`,
        };
    },
};

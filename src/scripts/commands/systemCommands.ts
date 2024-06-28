import router from "../../plugins/router";
import { CommandType } from "./Command";
import { prefix, showTerminal } from "../terminal";
import { remult } from "remult";
import { Spotlight } from "../../shared/Spotlight";
import { logout } from "../login";
import { Timeline } from "../../shared/Timeline";
import { loadSpotlight } from "../spotlight";
import { Account } from "../../shared/Account";

export const spotlightCommand: CommandType = {
    label: "spotlight",
    admin: true,
    onCommand: async (args: Array<string>) => {
        // check permissions
        if (args.length <= 2 || !(Number(args[1]) >= 0)) {
            const spotlightProjects: Spotlight[] = await remult
                .repo(Spotlight)
                .find({ include: { timeline: true } });
            let output = "![bold][Current events under the spotlight:]";
            spotlightProjects.forEach((project) => {
                output = `${output}\n${project.priority}. ${project.timeline?.title} ![italics][(id: ${project.timeline?.id})]`;
            });
            return { value: `${output}\n\nTo change spotlight: spotlight [position] [name | id]` };
        } else {
            let timelineEvent = await remult.repo(Timeline).findOne({ where: { id: args[2] } });
            if (!timelineEvent) {
                const title = args.splice(2, args.length - 2);
                timelineEvent = await remult
                    .repo(Timeline)
                    .findOne({ where: { title: title.join(" ") } });
            }
            if (timelineEvent) {
                await remult.repo(Spotlight).delete(Number(args[1]));
                await remult
                    .repo(Spotlight)
                    .insert({ priority: Number(args[1]), timeline: timelineEvent });
            } else {
                return {
                    value: `No timeline event found.\nCommand usage: spotlight [position] [name | id]`,
                };
            }
            loadSpotlight();
            return undefined;
        }
    },
};

export const editPermCommand: CommandType = {
    label: "editperm",
    admin: true,
    onCommand: async (args: Array<string>) => {
        args.shift();
        if (args.length !== 2) return { value: `Usage: editperm [username] [permission level]` };
        if (![0, 1, 2, 3].includes(Number(args[1])))
            return { value: `editperm: invalid permission level '${args[1]}'` };

        const user = await remult.repo(Account).findOne({ where: { username: args[0] } });
        if (user === undefined) return { value: `editperm: invalid username '${args[0]}'` };
        remult.repo(Account).update(user.id, { access: Number(args[1]) });
    },
};

export const cdCommand: CommandType = {
    label: "cd",
    onCommand: (args: Array<string>) => {
        if (args.length === 1) return;
        if (["timeline", "home", "notes"].includes(args[1])) {
            if (args[1] === "notes") router.push({ name: args[1], params: { id: "" } });
            else router.push({ name: args[1] });
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

export const logoutCommand: CommandType = {
    label: "logout",
    onCommand: () => {
        if (!remult.authenticated()) return { value: "Error: unknown user" };
        else {
            logout();
            return {
                value: `Bye ${remult.user?.name}.`,
            };
        }
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
        if (args.length === 1)
            return { value: "![bold][Available themes are:]\n![blue][Good]\t![orange][Evil]" };
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
    admin: true,
    onCommand: () => {
        return {
            value: `![bold, orange][NUT]`,
        };
    },
};

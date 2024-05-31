import { nextTick, readonly, ref } from "vue";
import router from "../../plugins/router";
import { remult } from "remult";
import { Account } from "../../shared/Acount";

// (directy of command, text output) first element should be null for command outputs.
const outputs = ref<Array<[string | null, string]>>([]);
const prefix = ref<Array<string>>(["<username>@huon.dev", ":", "/", "$ "]);

export const showTerminal = ref<boolean>(false);
export const commandInput = ref<HTMLInputElement | null>();

export const Outputs = readonly(outputs);
export const Prefix = readonly(prefix);

export const loadTerminal = (route: string) => {
    prefix.value[2] = route;
};

export const commandHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter" && commandInput.value?.value) {
        e.preventDefault();
        outputs.value?.push([prefix.value[2], commandInput.value?.value]);
        const args = commandInput.value?.value.split(" ");
        switch (args[0]) {
            case "exit":
                showTerminal.value = false;
                break;
            case "cd":
                cdCommand(args);
                break;
            case "account":
                createAccountCommand(args).then((response) => {
                    outputs.value.push([null, response!]);
                });
                break;
            case "fetch":
                fetchCommand(args).then((res) => {
                    outputs.value.push([null, res]);
                });
                break;
            case "advice":
                outputs.value.push([null, "..."]);
                const interval = setInterval(() => {
                    if (outputs.value[outputs.value.length - 1][1] === "...") {
                        outputs.value[outputs.value.length - 1][1] = "....";
                        return;
                    }
                    outputs.value[outputs.value.length - 1][1] = "...";
                }, 300); //
                adviceCommand().then((res) => {
                    clearInterval(interval);
                    outputs.value[outputs.value.length - 1] = [null, res];
                });
                break;
            default:
                outputs.value?.push([null, `'${args[0]}': Command not found`]);
        }
        commandInput.value.value = "";

        nextTick(() => {
            commandInput.value?.scrollIntoView();
        });
    }
};

const cdCommand = (args: Array<string>) => {
    if (args.length === 1) return;
    if (["timeline", "home", "notes"].includes(args[1])) {
        router.push({ name: args[1] });
        prefix.value[2] = `/${args[1]}`;
    } else {
        outputs.value?.push([
            null,
            `cd: No such file or directory '${args[1]}'`,
        ]);
    }
};

const createAccountCommand = async (args: Array<string>) => {
    switch (args[1]) {
        case "create":
            if (args.length !== 5)
                return "create arguments: [username] [email] [password]";
            await remult.repo(Account).insert({
                username: args[2],
                email: args[3],
                password: args[4],
            });
            return "Account created!";
        default:
            let output = "name:\t\temail:\n";
            (await remult.repo(Account).find()).forEach((account) => {
                output = output + `${account.username}\t\t${account.email}\n`;
            });
            output =
                output +
                `\nTotal number of users: ${remult.repo(Account).count()}`;
            return output;
    }
};

const fetchCommand = async (args: Array<string>) => {
    args.shift();
    if (args.length === 0) {
        return "Please provide a url";
    }

    try {
        const opts = {
            method: "GET",
            body: JSON.stringify(args[2]),
        };
        const response = await fetch(args[0], opts);
        const data = await response.text();
        return data;
    } catch (error) {
        return error as string;
    }
};

const adviceCommand = async () => {
    try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        return data.slip.advice;
    } catch (error) {
        return error as string;
    }
};

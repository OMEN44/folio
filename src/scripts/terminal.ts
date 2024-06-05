import { nextTick, readonly, ref } from "vue";
import { CommandOutputType, CommandType, PrefixType } from "./commands/Command";

// (directy of command, text output) first element should be null for command outputs.
const outputs = ref<Array<CommandOutputType>>([]);
const commandLabels = ref<Array<string>>([]);
const commandList = ref<Array<CommandType>>([]);
// View command history
let oldCommandInput: string | undefined = undefined;
let historyIndex: number = outputs.value.length;

export const showTerminal = ref<boolean>(false);
export const commandInput = ref<HTMLInputElement | null>();
export const prefix = ref<PrefixType>({ username: "username", directory: "/", admin: false });

export const Outputs = readonly(outputs);

export const loadTerminal = (route: string) => {
    prefix.value.directory = route;
};

export const loadCommands = (commands: CommandType[]) => {
    commandLabels.value = [];
    commandList.value = [];
    commands.forEach((command) => {
        if (commandLabels.value.includes(command.label))
            console.error(`Skipping duplicate of command: ${command.label}`);
        else {
            commandLabels.value.push(command.label);
            commandList.value.push(command);
        }
    });
};

export const commandHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter" && commandInput.value?.value) {
        e.preventDefault();

        // prepare command and args
        const args: Array<string> = commandInput.value.value.split(" ");
        const commandIndex = commandLabels.value.indexOf(args[0]);

        // Push executed command to history
        pushStringOutput(prefix.value.directory, commandInput.value.value);

        // execute command
        if (commandIndex !== -1) {
            const output: CommandOutputType | undefined = commandList.value[commandIndex].onCommand(args);
            if (output !== undefined) outputs.value.push(output);
        } else {
            outputs.value?.push({ value: `'${args[0]}': Command not found` });
        }

        // move histy index to end again
        historyIndex = outputs.value.length;

        //prepare for next command
        commandInput.value.value = "";
        nextTick(() => {
            commandInput.value?.scrollIntoView();
        });
    } else if (e.key === "ArrowUp" && outputs.value.length > 0 && commandInput.value) {
        // If the index can be moved up once it should be to prevent the historyindex getting stuck
        if (historyIndex > 0) historyIndex--;
        // decrement the history index while in bounds and check if that output has a prefix
        for (let i = historyIndex; i >= 0; i--) {
            if (outputs.value[i].prefix !== undefined) {
                historyIndex = i;
                break;
            }
        }
        commandInput.value.value = outputs.value[historyIndex].value;
    } else if (e.key === "ArrowDown" && outputs.value.length > 0 && commandInput.value) {
        // same logic as above but with moving up
        if (
            historyIndex < outputs.value.length - 1 &&
            // make sure it doesn't default to an output
            !(outputs.value[1 + historyIndex].prefix === undefined && historyIndex + 2 === outputs.value.length)
        )
            historyIndex++;
        for (let i = historyIndex; i < outputs.value.length; i++) {
            if (outputs.value[i].prefix !== undefined) {
                historyIndex = i;
                break;
            }
        }
        // if (historyIndex === outputs.value.length - 1) {
        //     commandInput.value.value = "";
        // } else {
        commandInput.value.value = outputs.value[historyIndex].value;
        // }
    }
    console.log(historyIndex);
};

export const pushStringOutput = (directory: string, outputValue: string) => {
    outputs.value?.push({
        prefix: { username: prefix.value.username, directory: directory, admin: prefix.value.admin },
        value: outputValue,
    });
};

// const createAccountCommand = async (args: Array<string>) => {
//     switch (args[1]) {
//         case "create":
//             if (args.length !== 5) return "create arguments: [username] [email] [password]";
//             await remult
//                 .repo(Account)
//                 .insert({
//                     username: args[2],
//                     email: args[3],
//                     password: args[4],
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//             return "Account created!";
//         default:
//             let output = "name:\t\temail:\n";
//             (await remult.repo(Account).find()).forEach((account) => {
//                 output = output + `${account.username}\t\t${account.email}\n`;
//             });
//             output = output + `\nTotal number of users: ${remult.repo(Account).count()}`;
//             return output;
//     }
// };

// const fetchCommand = async (args: Array<string>) => {
//     args.shift();
//     if (args.length === 0) {
//         return "Please provide a url";
//     }

//     try {
//         const opts = {
//             method: "GET",
//             body: JSON.stringify(args[2]),
//         };
//         const response = await fetch(args[0], opts);
//         const data = await response.text();
//         return data;
//     } catch (error) {
//         return error as string;
//     }
// };

// const adviceCommand = async () => {
//     try {
//         const response = await fetch("https://api.adviceslip.com/advice");
//         const data = await response.json();
//         return data.slip.advice;
//     } catch (error) {
//         return error as string;
//     }
// };

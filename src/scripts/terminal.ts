import { nextTick, readonly, ref } from "vue";
import { CommandOutputType, CommandType, PrefixType } from "./commands/Command";

// (directy of command, text output) first element should be null for command outputs.
const outputs = ref<Array<CommandOutputType>>([]);
const commandLabels = ref<Array<string>>([]);
const commandList = ref<Array<CommandType>>([]);
// View command history
let commandHistory: string[] = [""];
let historyIndex: number = outputs.value.length;

export const showTerminal = ref<boolean>(false);
export const commandInput = ref<HTMLInputElement | null>();
export const prefix = ref<PrefixType>({
    username: "username",
    directory: "/",
    admin: false,
});

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
    if (historyIndex === commandHistory.length - 1)
        commandHistory[commandHistory.length - 1] = commandInput.value!.value;
    if (e.key === "Enter" && commandInput.value?.value) {
        e.preventDefault();

        // prepare command and args
        const args: Array<string> = commandInput.value.value.split(" ");
        const commandIndex = commandLabels.value.indexOf(args[0]);

        // Push executed command to history
        pushStringOutput(prefix.value.directory, commandInput.value.value);

        // execute command
        if (commandIndex !== -1) {
            // check for permissions
            if (commandList.value[commandIndex].admin && !prefix.value.admin) {
                outputs.value.push({ value: `${args[0]}: Permission denied` });
            } else {
                const output = commandList.value[commandIndex].onCommand(args);
                if (output !== undefined) {
                    // if the command is async create a spinner and wait
                    if (typeof (output as Promise<CommandOutputType>).then === "function") {
                        const spinner = ["/", "-", "\\", "|"];
                        let spinnerIndex = 1;
                        const outputIndex = outputs.value.push({ value: spinner[0] }) - 1;
                        const interval = setInterval(() => {
                            outputs.value[outputIndex] = { value: spinner[spinnerIndex % 4] };
                            spinnerIndex++;
                            // check if spinner index has gone to far
                        }, 100);
                        (output as Promise<any>).then((result) => {
                            clearInterval(interval);
                            outputs.value[outputIndex] =
                                result === undefined ? { value: `${args[0]}: Success` } : result;
                            nextTick(() => {
                                commandInput.value?.scrollIntoView();
                            });
                        });
                    } else outputs.value.push(output as CommandOutputType);
                }
            }
        } else {
            outputs.value?.push({ value: `'${args[0]}': Command not found` });
        }

        //update the command history
        commandHistory[commandHistory.length - 1] = commandInput.value.value;
        commandHistory.push("");
        // move histoy index to end again
        historyIndex = commandHistory.length - 1;

        //prepare for next command
        commandInput.value.value = "";
        nextTick(() => {
            commandInput.value?.scrollIntoView();
        });
    } else if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
        }
        commandInput.value!.value = commandHistory[historyIndex];
    } else if (e.key === "ArrowDown") {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
        }
        commandInput.value!.value = commandHistory[historyIndex];
    }
};

export const pushStringOutput = (directory: string, outputValue: string) => {
    outputs.value?.push({
        prefix: { username: prefix.value.username, directory: directory, admin: prefix.value.admin },
        value: outputValue,
    });
};

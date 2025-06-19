export interface PrefixType {
    user: string;
    admin: boolean;
    directory: string;
}

export interface CommandOutputType {
    prefix?: PrefixType;
    output: string;
}

export interface CommandType {
    label: string;
    help: string;
    aliases?: string[];
    adminOnly?: boolean;
    execute: (args: string[]) => CommandOutputType | Promise<CommandOutputType>;
}

export let availableCommands: CommandType[] = [];

export let commandHistory = $state<string[]>([]);

let activePrefix = $derived<PrefixType>({
    user: "guest",
    admin: false,
    directory: "~",
});

export const commandHandler = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const inputElement = e.target as HTMLInputElement;
        const input = inputElement.value.trim().split(" ");

        // Search for command
        const command = availableCommands.find(
            (cmd) => cmd.label === input[0] || (cmd.aliases && cmd.aliases.includes(input[0]))
        );

        if (command && (activePrefix.admin || !command.adminOnly)) {
            // Execute command
            let output: CommandOutputType | Promise<CommandOutputType> = await command.execute(
                input.slice(1)
            );
            commandHistory.push(output.output);
        } else if (command && command.adminOnly && !activePrefix.admin) {
            // Command is admin only
            commandHistory.push("Permission denied: This command is for administrators only.");
        } else {
            // Command not found
            commandHistory.push(`${input[0]}: command not found`);
        }

        inputElement.value = ""; // Clear input after execution
    }
};

export const getActivePrefix = (asHTML: boolean) => {
    if (asHTML)
        return `<span class="primary">${activePrefix.user}@huon.dev</span>:<span class="secondary">
    ${activePrefix.directory}</span>${activePrefix.admin ? "#" : "$"}`;
    return activePrefix;
};

export const loadCommands = (commands: CommandType[]) => {
    let labels: string[] = [];

    for (const command of commands) {
        if (
            labels.includes(command.label) ||
            (command.aliases && command.aliases.some((alias) => labels.includes(alias)))
        ) {
            console.warn(`Command label or alias already exists: ${command.label}`);
            continue;
        } else {
            availableCommands.push(command);
            labels.push(command.label);
            if (command.aliases) {
                command.aliases.forEach((alias) => {
                    labels.push(alias);
                });
            }
        }
    }
};

const pingCommand: CommandType = {
    label: "ping",
    onCommand: (args): CommandOutputType => {
        return {
            value: "test",
        };
    },
};

interface CommandOutputType {
    route?: string;
    value: string | Array<string>;
}

interface CommandType {
    label: string;
    onCommand(args: Array<string>): CommandOutputType;
}

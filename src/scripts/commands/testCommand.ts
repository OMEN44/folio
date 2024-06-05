import { CommandType } from "./Command";

export const testCommand: CommandType = {
    label: "test",
    onCommand: (args: Array<string>) => {
        args.shift();
        return { value: `![${args.join(",")}][${args.join(" ")}]` };
    },
};

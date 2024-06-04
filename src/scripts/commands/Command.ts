export const pingCommand: CommandType = {
    label: "ping",
    onCommand: (args): CommandOutputType => {
        return {
            value: "test",
        };
    },
};

export const formatString = (raw: string): string => {
    let tokenLocations: Array<[number, number]> = [];

    Array.from(raw).forEach((character, index) => {
        let inToken: boolean = false;
        if (inToken === false && character === "!" && raw[index + 1] === "[") {
            inToken = true;
            tokenLocations.push([index, -1]);
        }
        if (inToken === true && character === "]") {
            inToken = false;
        }
    });

    return "";
};

export interface PrefixType {
    username: string;
    directory: string;
    admin: boolean;
}

export const prefixToString = (prefix: PrefixType): string => {
    //       primary is --blue          secondary is --blue-alt
    return `![primary][${prefix.username}]:![secondary][${prefix.directory}]${prefix.admin ? "# " : "$ "}`;
};

// value should be rendered as:
// This is the colour ![red, bold][red]\nand ![blue][blue] is on the next <line />
// This is the colour <span class="red"><strong>red</strong></span><br/><span class="blue">blue</span> is on the next &lt;line&gt;
export interface CommandOutputType {
    prefix?: PrefixType;
    value: string;
}

export const outputToHTML = (output: CommandOutputType): string => {
    let outputHTML: string = "";

    if (output.prefix) {
        outputHTML = `${prefixToString(output.prefix)}`;
    }

    return outputHTML;
};

export interface CommandType {
    label: string;
    onCommand(args: Array<string>): CommandOutputType | undefined;
}

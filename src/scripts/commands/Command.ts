export const pingCommand: CommandType = {
    label: "ping",
    onCommand: (args): CommandOutputType => {
        return {
            value: "test",
        };
    },
};

const validClasses: string[] = [
    "primary",
    "secondary",
    "bold",
    "italics",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
];

export const formatString = (raw: string): string => {
    const regex: RegExp = /\!\[(.*?)\]\[(.*?)\]/g;
    const formattedText: string = raw.replace(regex, (_match, classes: string, content: string) => {
        const classList: string = classes
            .split(",")
            .map((c: string) => {
                if (validClasses.includes(c.trim())) return c.trim();
                else return "";
            })
            .join(" ");
        return `<span class='${classList}'>${content}</span>`;
    });
    //console.log(formattedText);
    return formattedText;
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
    let outputValue: string = output.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    if (output.prefix) {
        outputHTML = `${prefixToString(output.prefix)}`;
    } else {
        outputValue = outputValue.split("\\n").join("<br/>");
    }

    outputHTML = `${outputHTML}${outputValue}`;

    return formatString(outputHTML);
};

export interface CommandType {
    label: string;
    onCommand(args: Array<string>): CommandOutputType | undefined;
}

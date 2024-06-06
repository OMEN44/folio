import { CommandType } from "./Command";

export const adviceCommand: CommandType = {
    label: "advice",
    onCommand: async () => {
        try {
            const response = await fetch("https://api.adviceslip.com/advice");
            const data = await response.json();
            return { value: data.slip.advice };
        } catch (error) {
            return { value: error as string };
        }
    },
};

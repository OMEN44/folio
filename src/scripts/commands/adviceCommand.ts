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

export const jokeCommand: CommandType = {
    label: "joke",
    onCommand: async () => {
        try {
            const response = await fetch("https://icanhazdadjoke.com/", {
                headers: {
                    Accept: "application/json",
                },
            });
            const data = await response.json();
            return { value: data.joke };
        } catch (error) {
            return { value: error as string };
        }
    },
};

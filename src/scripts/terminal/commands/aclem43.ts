export const fetchCommand = async (args: Array<string>) => {
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

export const adviceCommand = async () => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    return data.slip.advice;
  } catch (error) {
    return error as string;
  }
};

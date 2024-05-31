import { remult } from "remult";
import { Account } from "../../../shared/Acount";

export const createAccountCommand = async (args: Array<string>) => {
  switch (args[1]) {
    case "create":
      if (args.length !== 5)
        return "create arguments: [username] [email] [password]";
      await remult.repo(Account).insert({
        username: args[2],
        email: args[3],
        password: args[4],
      });
      return "Account created!";
    default:
      let output = "name:\t\temail:\n";
      (await remult.repo(Account).find()).forEach((account) => {
        output = output + `${account.username}\t\t${account.email}\n`;
      });
      output =
        output + `\nTotal number of users: ${remult.repo(Account).count()}`;
      return output;
  }
};

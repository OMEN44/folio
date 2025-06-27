import { BackendMethod, remult } from "remult";
import { User } from "./User";

export class userController {
    @BackendMethod({ allowed: true })
    static async getUserData(username: string, password: string) {
        const user = await remult.repo(User).findOne({
            where: {
                $and: [
                    {
                        $or: [{ name: username }, { email: username }],
                    },
                    { password: password },
                ],
            },
        });

        return user || null;
    }
}

import express from "express";
import { api } from "./api";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import cors from "cors";
import { remult, UserInfo } from "remult";
import { Account } from "../shared/Account";

const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:5173", "https://localhost:5173"],
        credentials: true,
        exposedHeaders: ["set-cookie"],
    })
);
app.use(
    cookieSession({
        keys: ["spicy secret ;)", "spicy secret ;)"],
        //      d   h    m    s    ms
        maxAge: 2 * 24 * 60 * 60 * 1000,
    })
);
app.use(api);
// app.use(auth);

app.post("/api/login", api.withRemult, async (req, res) => {
    const users: Account[] = await remult.repo(Account).find({ where: { username: req.body.username } });

    if (users.length !== 0) {
        let validPassword = false;
        users.forEach((user) => {
            if (user.password === req.body.password) {
                req.session!["user"] = {
                    id: user.id,
                    name: user.username,
                    roles: [user.access.toString()],
                } as UserInfo;
                res.json(req.session!["user"]);
                validPassword = true;
                return;
            }
        });
        if (!validPassword) res.status(401).json("Invalid username or password");
    } else {
        res.status(404).json("Account not found");
    }
});

app.post("/api/logout", (req, res) => {
    req.session!["user"] = null;
    res.json("Signed out successfully");
});

app.get("/api/user", (req, res) => {
    console.log(req.session);
    res.json(req.session!["user"]);
});

app.listen(3000, () => console.log("Listening at http://localhost:3000/api/"));

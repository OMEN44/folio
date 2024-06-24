import express from "express";
import { api } from "./api";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import { remult, UserInfo } from "remult";
import { Account } from "../shared/Account";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        keys: ["spicy secret ;)", "spicy secret ;)"],
        //      d   h    m    s    ms
        maxAge: 2 * 24 * 60 * 60 * 1000,
    })
);
app.use(api);

if (process.env.deployment === "true") {
    // deployment stuff:
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'", "icanhazdadjoke.com/", "api.adviceslip.com/advice"],
                    "script-src-attr": ["'self'", "'unsafe-inline'"],
                },
            },
        })
    );
    app.use(compression());

    const frontendFiles = process.cwd() + "/dist";
    app.use(express.static(frontendFiles));
    app.get("/*", (_, res) => {
        res.sendFile(frontendFiles + "/index.html");
    });
}

// login api
app.post("/api/login", api.withRemult, async (req, res) => {
    const users: Account[] = await remult
        .repo(Account)
        .find({ where: { username: req.body.username } });

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
    res.json(req.session!["user"]);
});

app.listen(4000, () => console.log("Listening at http://localhost:4000/api/"));

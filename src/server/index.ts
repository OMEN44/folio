import express from "express";
import { api } from "./api";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import { remult, UserInfo } from "remult";
import { Account } from "../shared/Account";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import argon2 from "argon2";

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

// deployment stuff:
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [
                    "'self'",
                    "icanhazdadjoke.com/",
                    "api.adviceslip.com/advice",
                    "api.emailjs.com/",
                ],
                "script-src-attr": ["'self'"],
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

// login api
app.post("/api/login", api.withRemult, async (req, res) => {
    const users: Account[] = await remult
        .repo(Account)
        .find({ where: { username: req.body.username } });

    if (users.length === 1) {
        if (await argon2.verify(users[0].password, req.body.username + req.body.password)) {
            req.session!["user"] = {
                id: users[0].id,
                name: users[0].username,
                roles: [users[0].access.toString()],
            } as UserInfo;
            res.json(req.session!["user"]);
        } else res.status(401).json("Invalid username or password");
    } else {
        res.status(404).json("Account not found");
    }
});

app.post("/api/register", api.withRemult, async (req, res) => {
    const { username, password, email } = req.body;
    remult
        .repo(Account)
        .find({ where: { username: username } })
        .then(async (response) => {
            if (response.length !== 0) {
                res.status(409).json("Username exists");
            } else {
                remult
                    .repo(Account)
                    .insert({
                        username: username,
                        email: email,
                        password: await argon2.hash(username + password),
                        access: 3,
                    })
                    .then((account) => {
                        req.session!["user"] = {
                            id: account.id,
                            name: account.username,
                            roles: [account.access.toString()],
                        } as UserInfo;
                        res.json(req.session!["user"]);
                    });
            }
        });
});

app.post("/api/logout", (req, res) => {
    req.session!["user"] = null;
    res.json("Signed out successfully");
});

app.post("/api/user", (req, res) => {
    res.json(req.session!["user"]);
});

app.listen(4000, () => console.log("Listening at http://localhost:4000/api/"));

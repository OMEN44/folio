import express from "express";
import { api } from "./api";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        name: "loginSession",
        secret: "spicy secret ;)",
    })
);
app.use(api);

app.post("/api/signIn", (req, res) => {
    req.session!.user = { id: 1, name: "admin", roles: ["admin"] };
});

app.listen(3000, () => console.log("Listening at http://localhost:3000/api/"));

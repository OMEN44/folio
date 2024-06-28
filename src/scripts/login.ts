import { readonly, ref } from "vue";
import getAxios from "../plugins/axios";
import { remult } from "remult";
import { prefix } from "./terminal";

const accessLevel = ref<number>(3);

export const errorMessage = ref<string | null>(null);
export const formIndex = ref<number>(0);
export const loginDetails = ref<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}>({ username: "", email: "", password: "", confirmPassword: "" });

export const AccessLevel = readonly(accessLevel);

export const login = async () => {
    if (loginDetails.value.username === "" || loginDetails.value.password === "") {
        errorMessage.value = "Username and password must be filled.";
        return;
    }

    getAxios()
        .post("/login", {
            username: loginDetails.value.username,
            password: loginDetails.value.password,
        })
        .then((response) => {
            remult.user = response.data;

            prefix.value.admin = remult.user?.roles![0] === "0";
            prefix.value.username = remult.user?.name!;
            errorMessage.value = "";
            formIndex.value = 2;
            setPermissionLevel();
        })
        .catch((error) => {
            errorMessage.value = error.response.data;
        });
};

export const register = () => {
    if (
        loginDetails.value.username === "" ||
        loginDetails.value.password === "" ||
        loginDetails.value.email === ""
    ) {
        errorMessage.value = "Username, password and email must be filled.";
        return;
    }
    if (loginDetails.value.confirmPassword !== loginDetails.value.password) {
        errorMessage.value = "Passwords do not match.";
        return;
    }
    if (loginDetails.value.username.length > 25 || loginDetails.value.username.length < 3) {
        errorMessage.value = "Username must be between 3 and 25 characters";
    }
    errorMessage.value = "";

    getAxios()
        .post("/register", {
            username: loginDetails.value.username,
            email: loginDetails.value.email,
            password: loginDetails.value.password,
        })
        .then((response) => {
            remult.user = response.data;

            prefix.value.admin = remult.user?.roles![0] === "0";
            prefix.value.username = remult.user?.name!;
            errorMessage.value = "";
            formIndex.value = 2;
            setPermissionLevel();
        })
        .catch((error) => {
            errorMessage.value = error.response.data;
        });
};

export const logout = async () => {
    getAxios()
        .post("/logout")
        .then(() => {
            remult.user = undefined;
            errorMessage.value = "Signed out successfully";
            formIndex.value = 0;
            setPermissionLevel();
        });

    loginDetails.value = { username: "", email: "", password: "", confirmPassword: "" };

    prefix.value.admin = false;
    prefix.value.username = "guest";
};

export const setPermissionLevel = () => {
    if (remult.authenticated()) accessLevel.value = Number(remult.user?.roles![0]);
    else accessLevel.value = 3;
};

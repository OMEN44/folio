import { readonly, ref } from "vue";
import getAxios from "../plugins/axios";
import { remult } from "remult";

const errorMessage = ref<string | null>(null);

export const formIndex = ref<number>(0);
export const loginDetails = ref<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}>({ username: "", email: "", password: "", confirmPassword: "" });

export const ErrorMessage = readonly(errorMessage);

export const login = async () => {
    if (loginDetails.value.username === "" || loginDetails.value.password === "") {
        errorMessage.value = "Username and password must be filled.";
        return;
    }

    getAxios()
        .post("/login", { username: loginDetails.value.username, password: loginDetails.value.password })
        .then((response) => {
            console.log(response.data);
            remult.user = response.data;
        })
        .catch((error) => {
            errorMessage.value = error.response.data;
        });
};

export const register = () => {};

export const logout = async () => {
    getAxios()
        .post("/logout")
        .then(() => {
            remult.user = undefined;
            errorMessage.value = "Signed out successfully";
            formIndex.value = 0;
        });
};

import { readonly, ref } from "vue";
import getAxios from "../plugins/axios";

const errorMessage = ref<string | null>(null);

export const formIndex = ref<number>(0);
export const loginDetails = ref<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}>({ username: "", email: "", password: "", confirmPassword: "" });

export const ErrorMessage = readonly(errorMessage);

export const login = () => {
    if (loginDetails.value.username === "" || loginDetails.value.password === "") {
        errorMessage.value = "Username and password must be filled.";
        return;
    }

    getAxios()
        .post("/login", { username: loginDetails.value.username, password: loginDetails.value.password })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            if (error.response.status === 401) {
            }
            errorMessage.value = error.response.data;
            console.log(error.response);
            console.log(error.response.data);
            console.log(error.response.status);
        });
};

export const register = () => {};

export const logout = () => {};

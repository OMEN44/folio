import { readonly, ref } from 'vue';
import { useCookies } from "vue3-cookies";
import getAxios from '../plugins/axios.js'

const user = ref<{ name: string, access: number, id: number } | null>(null)
const users = ref<Array<{ name: string, email: string, id: number, access: number }>>([])
const isShown = ref<number>(0);
const message = ref<string>('');
const cookies = useCookies().cookies

export const username = ref<HTMLInputElement | null>(null)
export const password = ref<HTMLInputElement | null>(null)
export const email = ref<HTMLInputElement | null>(null)

export const User = readonly(user)
export const Users = readonly(users)
export const IsShown = readonly(isShown)
export const Message = readonly(message)

export const switchAccountView = (value: number) => {
    loadLoginData()

    if (value === 2 && user.value === null) isShown.value = 1
    else if ((value === 1 || value === 3) && user.value !== null) isShown.value = 2
    else isShown.value = value

    if (isShown.value === 2 && user.value !== null) {
        message.value = user.value?.name
        if (user.value.access === 0) {
            users.value = [];
            getAxios().get('/login/all')
                .then(res => {
                    res.data.value.forEach((u) => {
                        if (u.id !== user.value?.id)
                            users.value.push({
                                name: u.username,
                                email: u.email,
                                id: u.id,
                                access: u.access
                            })
                    })
                })
        }
    }
}

export const loadLoginData = () => {
    if (cookies.isKey('authToken')) {
        getAxios().get('login')
            .then(res => {
                user.value = {
                    name: res.data.username,
                    access: Number(res.data.accessLevel),
                    id: Number(res.data.userId)
                }
            }).catch(() => {
                user.value = null
            })
    } else {
        user.value = null
    }
}

export const login = (e: Event) => {
    e.preventDefault()
    if (username.value?.value === undefined || password.value?.value === undefined) {
        message.value = 'Username and password my be filled'
        return
    }
    getAxios().post('/login', { username: username.value?.value, password: password.value?.value })
        .then(res => {
            cookies.set('authToken', res.data.token, '7d')
            user.value = {
                name: res.data.name,
                access: Number(res.data.access),
                id: Number(res.data.id)
            }
            switchAccountView(2)
        }).catch(error => {
            if (error.response.status === 401) {
                message.value = error.response.data.error
            }
        });
}

export const logout = (e: Event) => {
    e.preventDefault()
    cookies.remove('authToken')
    message.value = 'successfully logged out'
    switchAccountView(1)
}

export const register = (e: Event) => {
    e.preventDefault()

    getAxios().post('/login/register', {
        username: username.value?.value,
        password: password.value?.value,
        email: email.value?.value
    }).then(response => {
        if (response.data.success) {
            message.value = 'Successfully registered'
            switchAccountView(1)
        }
    }).catch(error => {
        if (error.response.status === 409)
            message.value = error.response.data.error
        else
            console.error(error)
    })
}

export const updateAccessLevel = (value: number, id: number) => {
    getAxios().post('login/update', { id: id, access: value })
        .catch(error => {
            console.log(error)
        })
}
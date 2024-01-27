import getAxios from "../plugins/axios"

export const getUserData = async () => {
    let userData = null;
    await getAxios().get('login')
        .then(res => {
            userData = res.data
        })
    return userData
}
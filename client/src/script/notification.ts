import { readonly, ref, watch } from "vue"

interface NotificationType {
    message: string,
    hidden: boolean,
    cleared: boolean
}

const notifications = ref<Array<NotificationType>>([])
export const notificationList = readonly(notifications)

watch(() => notifications.value, () => {
    if (notifications.value.length > 3) {
        let purge: boolean = true
        notifications.value.forEach(noti => {
            if (!noti.hidden || !noti.cleared) {
                purge = false;
                return
            }
        })
        if (purge)
            notifications.value = []
    }
}, { deep: true })

export const remove = (e) => {
    const id = e.target !== undefined ? Number(e.target.id) : e
    if (notifications.value[id] === undefined) return
    notifications.value[id].hidden = true
    setTimeout(() => notifications.value[id].cleared = true, 500)
}

export const notify = (message: string) => {
    const id = notifications.value.push(
        {
            message: message,
            hidden: true,
            cleared: false
        }
    ) - 1

    setTimeout(() => notifications.value[id].hidden = false, 500);
    setTimeout(() => remove(id), 10000)
}
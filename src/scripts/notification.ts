import { readonly, ref, watch } from "vue";

interface NotificationType {
    message: string;
    hidden: boolean;
    cleared: boolean;
}

const notifications = ref<Array<NotificationType>>([]);

export const Notifications = readonly(notifications);

export const addNotification = (value: string) => {
    const index = notifications.value.push({ message: value, hidden: true, cleared: false }) - 1;
    setTimeout(() => (notifications.value[index].hidden = false), 500);
    setTimeout(() => removeNotification(index), 10000);
};

export const removeNotification = (index: number) => {
    if (notifications.value[index] !== undefined) {
        notifications.value[index].hidden = true;

        setTimeout(() => {
            notifications.value[index].cleared = true;
        }, 1000);
    }
};

watch(
    () => notifications.value,
    () => {
        if (notifications.value.length > 3) {
            let purge: boolean = true;
            notifications.value.forEach((noti) => {
                if (!noti.hidden || !noti.cleared) {
                    purge = false;
                    return;
                }
            });
            if (purge) notifications.value = [];
        }
    },
    { deep: true }
);

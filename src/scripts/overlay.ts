import { readonly, ref } from "vue";

const showOverlay = ref<boolean>(false);
const overlayContent = ref<string | OverlayType>("");
let closeEvents: Array<{ label: string; action(): void }> = [];

export const ShowOverlay = readonly(showOverlay);
export const OverlayContent = readonly(overlayContent);

export const closeOverlay = () => {
    // execute close action
    if (typeof overlayContent.value === "string") {
        const actionIndex = closeEvents.findIndex(
            (action) => action.label === overlayContent.value
        );
        if (actionIndex > -1) closeEvents[actionIndex].action();
    }

    showOverlay.value = false;
};

export const setOverlayContent = (content: string | OverlayType) => {
    showOverlay.value = true;
    overlayContent.value = content;
};

export const loadCloseEvents = (events: Array<{ label: string; action(): void }>) => {
    closeEvents = events;
};

export interface OverlayType {
    title: string;
    content?: string;
    buttons: {
        name: string;
        primary: boolean;
        action(): void;
    }[];
}

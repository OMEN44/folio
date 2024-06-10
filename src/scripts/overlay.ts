import { readonly, ref } from "vue";

const showOverlay = ref<boolean>(false);
const overlayContent = ref<string | OverlayType>("");

export const ShowOverlay = readonly(showOverlay);
export const OverlayContent = readonly(overlayContent);

export const closeOverlay = () => (showOverlay.value = false);

export const setOverlayContent = (content: string | OverlayType) => {
    showOverlay.value = true;
    overlayContent.value = content;
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

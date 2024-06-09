import { readonly, ref } from "vue";

const showOverlay = ref<boolean>(false);
const overlayContent = ref<string>("");

export const ShowOverlay = readonly(showOverlay);
export const OverlayContent = readonly(overlayContent);

export const closeOverlay = () => (showOverlay.value = false);

export const setOverlayContent = (content: string) => {
    showOverlay.value = true;
    overlayContent.value = content;
};

import { ref } from "vue";
import { Spotlight } from "../shared/Spotlight";
import { remult } from "remult";

export const spotlightData = ref<Spotlight[]>([]);

export const loadSpotlight = () => {
    remult
        .repo(Spotlight)
        .find({ include: { timeline: { include: { image: true, note: true, tags: true } } } })
        .then((res) => (spotlightData.value = res));
};

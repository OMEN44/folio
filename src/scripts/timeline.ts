import { readonly, ref } from "vue";
import { Timeline } from "../shared/Timeline";
import { remult } from "remult";

const timelineData = ref<Timeline[]>([]);

export const filter = ref<{ searchTerm: string; tags: [string] }>();
export const year = ref<number>(new Date().getFullYear());

export const TimelineData = readonly(timelineData);

export const updateTimeline = async () => {
    const rawTimelineData: Timeline[] = await remult
        .repo(Timeline)
        .find({ include: { image: true, note: true } });

    // filter and sort results
    rawTimelineData.sort((a, b) =>
        a.date.getFullYear() < b.date.getFullYear() ? -1 : 1
    );

    timelineData.value = rawTimelineData;
    year.value = timelineData.value[0].date.getFullYear();
};

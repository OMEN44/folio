import { readonly, ref } from "vue";
import { Timeline } from "../../shared/Timeline";
import { remult } from "remult";
import { searchForm } from "./search";

const timelineData = ref<Timeline[]>([]);

export const filter = ref<{ searchTerm: string; tags: [string] }>();
export const year = ref<number>(new Date().getFullYear());

export const TimelineData = readonly(timelineData);

export const updateTimeline = async () => {
    const rawTimelineData: Timeline[] = await remult
        .repo(Timeline)
        .find({ include: { image: true, note: true } });

    // order by
    if (searchForm.value.orderBy == 1)
        rawTimelineData.sort((a, b) => (a.date.getFullYear() > b.date.getFullYear() ? -1 : 1));
    else if (searchForm.value.orderBy == 2)
        rawTimelineData.sort((a, b) => (a.date.getFullYear() < b.date.getFullYear() ? -1 : 1));

    // filter
    timelineData.value = rawTimelineData.filter((timelineEvent) => {
        if (searchForm.value.hasLink && timelineEvent.url === "" && timelineEvent.note === null)
            return false;
        if (searchForm.value.hasImage && timelineEvent.image === null) return false;

        for (let tag of searchForm.value.searchTags) {
            if (
                !timelineEvent.content.toLocaleLowerCase().includes(tag.toLocaleLowerCase()) &&
                !timelineEvent.title.toLocaleLowerCase().includes(tag.toLocaleLowerCase()) &&
                !timelineEvent.tags.includes(tag)
            ) {
                return false;
            }
        }

        return true;
    });
    if (timelineData.value.length !== 0) year.value = timelineData.value[0].date.getFullYear();
};

import { MembersOnly, remult } from "remult";
import { readonly, ref } from "vue";
import { Timeline } from "../../shared/Timeline";
import { Note } from "../../shared/Note";
import { Image } from "../../shared/Image";
import { updateTimeline } from "./timeline";

const notes = ref<Note[]>([]);
const images = ref<Image[]>([]);
const timelineEditorError = ref<string>("");

export let editing: string = "";
export const timelineEditor = ref<{
    // required:
    title: string;
    date: string;
    content: string;
    // optional:
    usesNote: boolean;
    noteId: number;
    url: string;
    existingImage: boolean;
    image: number;
    tagInput: string;
    tags: string[];
}>({
    title: "",
    date: "",
    content: "",
    usesNote: true,
    noteId: -1,
    url: "",
    existingImage: true,
    image: -1,
    tagInput: "",
    tags: [],
});

export const PublicNotes = readonly(notes);
export const Images = readonly(images);
export const TimelineEditorError = readonly(timelineEditorError);

export const loadResources = () => {
    remult
        .repo(Note)
        .find({ where: { public: true }, include: { author: true } })
        .then((res) => {
            notes.value = res;
        });
    remult
        .repo(Image)
        .find()
        .then((res) => {
            images.value = res;
        });
};

export const insert = () => {
    if (
        timelineEditor.value.title === "" ||
        timelineEditor.value.date === "" ||
        timelineEditor.value.content === ""
    ) {
        timelineEditorError.value = "Required fields: Title, Date, Content";
        return;
    }

    let newTimelineEvent: Partial<MembersOnly<Timeline>> = {
        title: timelineEditor.value.title,
        date: new Date(timelineEditor.value.date),
        content: timelineEditor.value.content,
        tags: timelineEditor.value.tags,
    };

    if (timelineEditor.value.usesNote && timelineEditor.value.noteId !== -1) {
        newTimelineEvent.note = notes.value[timelineEditor.value.noteId];
    } else if (!timelineEditor.value.usesNote) {
        newTimelineEvent.url = timelineEditor.value.url;
    }

    if (timelineEditor.value.existingImage && timelineEditor.value.image !== -1) {
        newTimelineEvent.image = images.value[timelineEditor.value.image];
    } else if (!timelineEditor.value.existingImage) {
        console.error("IMAGE UPLOAD NOT IMPLEMENTED");
    }

    if (editing === "") {
        remult
            .repo(Timeline)
            .insert(newTimelineEvent)
            .then(() => {
                updateTimeline();
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        remult
            .repo(Timeline)
            .update(editing, newTimelineEvent)
            .then(() => {
                updateTimeline();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    clearInput();
};

export const addTag = () => {
    if (
        timelineEditor.value.tagInput !== "" &&
        !timelineEditor.value.tags.includes(timelineEditor.value.tagInput)
    ) {
        timelineEditor.value.tags.push(timelineEditor.value.tagInput);
        timelineEditor.value.tagInput = "";
    }
};

export const removeTag = (tag: string) => {
    const elementIndex = timelineEditor.value.tags.indexOf(tag);
    timelineEditor.value.tags.splice(elementIndex, 1);
};

export const setEditing = (value: string) => {
    editing = value;
};

export const clearInput = () => {
    timelineEditorError.value = "";
    timelineEditor.value = {
        title: "",
        date: "",
        content: "",
        usesNote: true,
        noteId: -1,
        url: "",
        existingImage: true,
        image: -1,
        tagInput: "",
        tags: [],
    };
};

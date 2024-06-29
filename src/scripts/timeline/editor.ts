import { remult } from "remult";
import { Timeline } from "../../shared/Timeline";
import { closeOverlay, setOverlayContent } from "../overlay";
import { updateTimeline } from "./timeline";
import { Images, PublicNotes, setEditing, timelineEditor } from "./creator";
import { addNotification } from "../notification";
import router from "../../plugins/router";

export const goToLink = (currentEvent: Timeline) => {
    if (currentEvent.url) {
        window.open(currentEvent.url, "_blank")?.focus();
        return;
    } else {
        router.push({ name: "notes", params: { id: currentEvent.note?.id } });
    }
};

export const deleteEvent = (currentEvent: Timeline) => {
    setOverlayContent({
        title: "Delete Timeline Event",
        content: `Are you sure you want to delete: ${currentEvent.title}`,
        buttons: [
            {
                name: "Yes",
                primary: true,
                action() {
                    remult
                        .repo(Timeline)
                        .delete(currentEvent.id)
                        .then(() => {
                            addNotification(`Delete timeline event: ${currentEvent.title}`);
                            updateTimeline();
                            closeOverlay();
                        });
                },
            },
            {
                name: "No",
                primary: false,
                action() {
                    closeOverlay();
                },
            },
        ],
    });
};

export const editEvent = (currentEvent: Timeline) => {
    setEditing(currentEvent.id);
    timelineEditor.value = {
        title: currentEvent.title,
        date: "",
        content: currentEvent.content,
        usesNote: true,
        noteId: -1,
        url: "",
        existingImage: true,
        image: Images.value.findIndex((image) => image.path === currentEvent.image?.path),
        tagInput: "",
        tags: currentEvent.tags.concat(),
    };

    // set tags array
    // let tags = currentEvent.tags;
    // console.log(tags);

    // timelineEditor.value.tags = tags;

    // set date for form
    const eventDate = currentEvent.date;
    timelineEditor.value.date = `${eventDate.getFullYear()}-${(
        "0" +
        (eventDate.getMonth() + 1)
    ).slice(-2)}-${("0" + eventDate.getDate()).slice(-2)}`;

    // link type
    timelineEditor.value.usesNote = currentEvent.note?.id !== undefined;
    if (timelineEditor.value.usesNote) {
        timelineEditor.value.noteId = PublicNotes.value.findIndex(
            // may be broken if the note changes publicity
            (note) => note.id === currentEvent.note?.id
        );
    } else {
        timelineEditor.value.url = currentEvent.url!;
    }

    setOverlayContent("timeline-form");
};

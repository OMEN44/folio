<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEdit, faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Timeline } from "../shared/Timeline";
import { AccessLevel } from "../scripts/login";
import { closeOverlay, OverlayType, setOverlayContent } from "../scripts/overlay";
import { remult } from "remult";
import { updateTimeline } from "../scripts/timeline/timeline";
import { Images, PublicNotes, setEditing, timelineEditor } from "../scripts/timeline/creator";

const props = defineProps<{ eventData: Timeline }>();

const deleteOverlay: OverlayType = {
    title: "Delete Timeline Event",
    content: `Are you sure you want to delete: ${props.eventData.title}`,
    buttons: [
        {
            name: "Yes",
            primary: true,
            action() {
                remult
                    .repo(Timeline)
                    .delete(props.eventData.id)
                    .then(() => {
                        // Notification here
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
};

const editEvent = () => {
    setEditing(props.eventData.id);
    timelineEditor.value = {
        title: props.eventData.title,
        date: "",
        content: props.eventData.content,
        usesNote: true,
        noteId: -1,
        url: "",
        existingImage: true,
        image: Images.value.findIndex((image) => image.path === props.eventData.image?.path),
        tagInput: "",
        tags: props.eventData.tags,
    };
    console.log(props.eventData);

    // set date for form
    const eventDate = props.eventData.date;
    timelineEditor.value.date = `${eventDate.getFullYear()}-${(
        "0" +
        (eventDate.getMonth() + 1)
    ).slice(-2)}-${("0" + eventDate.getDate()).slice(-2)}`;

    // link type
    timelineEditor.value.usesNote = props.eventData.note?.id !== undefined;
    if (timelineEditor.value.usesNote) {
        timelineEditor.value.noteId = PublicNotes.value.findIndex(
            // may be broken if the note changes publicity
            (note) => note.id === props.eventData.note?.id
        );
    } else {
        timelineEditor.value.url = props.eventData.url!;
    }

    setOverlayContent("timeline-form");
};
</script>

<template>
    <div class="div-event-container">
        <div class="div-header">
            <h2>
                <font-awesome-icon
                    v-if="eventData.note || eventData.url"
                    class="option-icon-small"
                    :icon="faLink" />{{ eventData.title }}
            </h2>
            <kbd>
                {{ eventData.date.toLocaleString("default", { month: "long" }) }}
                {{ eventData.date.getFullYear() }}
            </kbd>
        </div>
        <div class="div-body">
            <p>
                {{ eventData.content }}
            </p>
            <img v-if="eventData.image" :src="eventData.image?.path" alt="" />
        </div>
        <div class="div-footer">
            <font-awesome-icon
                v-if="AccessLevel === 0"
                class="option-icon-small"
                :icon="faEdit"
                @click="editEvent" />
            <font-awesome-icon
                v-if="AccessLevel === 0"
                class="option-icon-small"
                :icon="faTrash"
                @click="setOverlayContent(deleteOverlay)" />
            <span class="tag" v-for="tag in eventData.tags">{{ tag }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.div-event-container {
    margin: 10px 0 40px 0;

    .div-header {
        border-bottom: 2px solid var(--blue);
        padding: 0 15px;
        display: flex;
        flex-direction: row;
        position: relative;

        @media (max-width: 700px) {
            flex-direction: column;
            margin-bottom: 5px;
        }

        .option-icon-small {
            margin: auto 10px auto -10px;
        }

        kbd {
            margin: auto 0 0 auto;
            font-size: 20px;
            padding: 5px 5px 5px 15px;

            @media (max-width: 500px) {
                padding: 0 5px 5px 0;
                margin: auto 0 0 0;
            }
        }

        h2 {
            font-weight: bold;
            font-size: 35px;

            @media (max-width: 500px) {
                font-size: 27px;
            }
        }

        &::before,
        &::after {
            position: absolute;
            content: "";
            background-color: var(--blue);
            width: 25px;
            height: 7px;
            bottom: -7px;
        }

        &::before {
            left: -5px;
            border-radius: 5px 0 5px 5px;
        }

        &::after {
            right: -5px;
            border-radius: 0 5px 5px 5px;
        }
    }

    .div-body {
        display: flex;
        flex-direction: row;
        padding: 10px;
        font-size: 20px;
        align-items: center;

        img {
            max-width: 300px;
            height: 100%;
            margin: 10px;

            @media (max-width: 700px) {
                margin: 15px 0;
                max-width: 100%;
            }
        }

        @media (max-width: 700px) {
            flex-direction: column;
            font-size: 16px;
        }
    }

    .div-footer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        span {
            background-color: var(--blue-background);
            border-radius: 4px;
            margin: 5px;
            padding: 3px 7px;
            text-align: center;
        }
    }
}
</style>

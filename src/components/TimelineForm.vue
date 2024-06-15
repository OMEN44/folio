<script setup lang="ts">
import { closeOverlay } from "../scripts/overlay";
import {
    addTag,
    Images,
    insert,
    loadResources,
    PublicNotes,
    removeTag,
    timelineEditor,
    TimelineEditorError,
} from "../scripts/timeline/creator";

loadResources();
</script>

<template>
    <form @submit.prevent>
        <h2>Timeline event editor</h2>
        <span v-text="TimelineEditorError" class="red"></span>
        <h3>Required fields</h3>
        <div class="div-title-date">
            <div class="div-title">
                <p>Title</p>
                <input type="text" v-model="timelineEditor.title" />
            </div>
            <div class="div-date">
                <p>Date</p>
                <input type="date" v-model="timelineEditor.date" />
            </div>
        </div>
        <p>Content</p>
        <textarea v-model="timelineEditor.content"></textarea>

        <h3>Optional fields</h3>
        <div class="div-selector">
            <p
                :class="{ selected: timelineEditor.usesNote }"
                @click="timelineEditor.usesNote = true">
                Note
            </p>
            <p
                :class="{ selected: !timelineEditor.usesNote }"
                @click="timelineEditor.usesNote = false">
                External URL
            </p>
        </div>
        <template v-if="timelineEditor.usesNote">
            <select v-model="timelineEditor.noteId">
                <option value="-1">Select a note</option>
                <option v-for="(note, index) in PublicNotes" :value="index">
                    {{ note.title }} - By {{ note.author!.username }}
                </option>
            </select>
        </template>
        <input type="text" class="input-selector" v-model="timelineEditor.url" v-else />

        <div class="div-selector">
            <p
                :class="{ selected: timelineEditor.existingImage }"
                @click="timelineEditor.existingImage = true">
                Existing image
            </p>
            <p
                :class="{ selected: !timelineEditor.existingImage }"
                @click="timelineEditor.existingImage = false">
                Uplaod image
            </p>
        </div>
        <template v-if="timelineEditor.existingImage">
            <select v-model="timelineEditor.image">
                <option value="-1">No image</option>
                <option v-for="(image, index) in Images" :value="index">
                    {{ image.label }} - {{ image.path }}
                </option>
            </select>
        </template>
        <input type="file" class="input-selector" @change="timelineEditor.image" v-else />

        <form class="div-tags" @submit.prevent>
            <p>Add tags</p>
            <div class="div-tag-input">
                <input type="text" v-model="timelineEditor.tagInput" />
                <button class="button-normal" type="submit" @click="addTag">Add</button>
            </div>
            <div class="div-tags-list">
                <span v-for="tag in timelineEditor.tags" @click="removeTag(tag)">{{ tag }}</span>
            </div>
        </form>

        <div class="div-buttons">
            <button class="button-normal" type="submit" @click="insert">Submit</button>
            <button class="button-normal" @click="closeOverlay">Cancel</button>
        </div>
    </form>
</template>

<style scoped lang="scss">
form {
    padding: 5px;
    max-width: 400px;
    width: 80vw;

    .div-title-date {
        display: flex;
        flex-direction: row;
        input {
            width: 100%;
        }

        .div-title {
            margin-right: 15px;
        }
    }

    h3 {
        font-size: 20px;
    }

    p {
        font-size: 18px;
        margin: 5px 0 2px 0;
    }

    input[type="file"] {
        border: none;
        width: 100%;
    }

    textarea,
    select {
        background-color: var(--blue-background);
        border: none;
        color: var(--text);
        padding: 5px 10px;
        border-radius: 4px;
        transition: border 0.5s;
        width: 100%;
        resize: vertical;
        max-height: 100px;
    }

    textarea {
        margin-bottom: 10px;
    }

    select:focus {
        outline: none;
    }

    .div-buttons {
        margin: 10px 0 0 -5px;
    }

    // HOW TF DO YOU STYLE DROPDOWNS
    select > option {
        color: black;
    }

    .button-normal:hover {
        transform: none;
        background-color: var(--blue-background);
    }

    .div-selector {
        display: flex;
        flex-direction: row;
        margin: 10px 0 10px 0;
        // margin: 10px 0 -2px 0;

        .selected {
            background-color: var(--blue-background);
        }

        p {
            margin-right: 15px;
            background-color: color-mix(in srgb, var(--blue-background) 35%, var(--background) 65%);
            border-radius: 4px;
            // border-radius: 4px 4px 0 0;
            padding: 5px 9px;
            text-align: center;
            cursor: pointer;
            width: fit-content;
        }
    }

    // .input-selector,
    // select {
    //     border-top-left-radius: 0;
    // }

    .div-tags {
        .div-tags-list {
            display: flex;
            flex-wrap: wrap;
            span {
                margin: 0 7px 7px 0;
                background-color: var(--blue-background);
                border-radius: 4px;
                padding: 3px 7px;
                text-align: center;
                cursor: pointer;
            }
        }
    }
}
</style>

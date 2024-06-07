<script setup lang="ts">
import { faCaretDown, faCaretUp, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<template>
    <div class="div-menu">
        <div class="div-note">
            <div class="div-note-header">
                <h3>Title</h3>
                <kbd>By username</kbd>
            </div>
            <p>Last edited</p>
        </div>
        <div class="div-folder">
            <div class="div-folder-header">
                <font-awesome-icon class="folder-option" :icon="false ? faCaretUp : faCaretDown" />
                <p>Title</p>
                <font-awesome-icon class="folder-option" :icon="faEllipsis" />
            </div>
            <div class="div-note" v-for="_ in 3">
                <div class="div-note-header">
                    <h3>Title</h3>
                    <kbd>By username</kbd>
                </div>
                <p>Last edited</p>
            </div>
        </div>
        <div class="div-note">
            <div class="div-note-header">
                <h3>Title</h3>
                <kbd>By username</kbd>
            </div>
            <p>Last edited</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.div-menu {
    min-width: 300px;
    width: 30%;

    .div-note {
        height: fit-content;
        border: 2px var(--blue) solid;
        border-radius: 4px;
        margin: 5px;
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        cursor: pointer;

        .div-note-header {
            display: flex;
            flex-direction: row;

            h3 {
                margin: 0;
                padding: 0;
            }

            kbd {
                margin: auto 0 3px 10px;
            }
        }
    }

    .div-folder {
        border: 2px var(--blue) solid;
        border-radius: 4px;
        padding: 5px 5px 0 5px;
        margin: 5px;

        .folder-option {
            margin: auto 5px;
        }

        .div-folder-header {
            display: flex;
            flex-direction: row;

            p {
                font-weight: bold;
            }
        }

        .div-note {
            margin: 5px 0;
        }
    }
}
</style>

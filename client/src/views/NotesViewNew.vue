<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon"
import { mdiMenu, mdiContentSave } from '@mdi/js'
</script>

<template>
<div class="div-container">
    <div class="div-left">
        <div class="div-title">
            <h1>Notes</h1>
        </div>
        <div class="div-note-menu">
            <div class="div-filter">

            </div>
            <div class="div-note">

            </div>
            <div class="div-folder">
                <div class="div-note">
                    
                </div>
                <div class="div-note">
                    
                </div>
            </div>
            <div class="div-note">

            </div>
        </div>
    </div>
    <div class="div-right">
        <div class="div-title">
            <svg-icon type="mdi" :path="mdiMenu" />
            <h1>Title goes here</h1><form v-if="TitleEditorActive" class="form-title-editor">
          <input type="text" v-model="titleInput" maxlength="24"
            :placeholder="Notes[Selected] === undefined ? 'No notes found' : Notes[Selected].title" autofocus>
          <button @click.prevent="saveTitle">
            <svg-icon type="mdi" class="icon" :path="mdiContentSave" />
          </button>
        </form>
        </div>
        <div class="div-editor">
            <div class="div-input">
                <div class="div-tools">

                </div>
                <textarea name="" id="" cols="30" rows="10" class="input">

                </textarea>
            </div>
            <div class="div-output">
                <div class="div-tools">
                    
                </div>
                <div class="div-markdown">

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.div-container {
    margin: 20px 40px;
    display: flex;
    flex-direction: row;

    @media (max-width: 800px) {
        margin: 50px 0;
    }
}

.div-left {
    border-right: var(--primary) solid 4px;
}

.div-right {
    flex: 1;

    .div-title {
        display: flex;
        flex-direction: row;

    }

    h1 {
        flex: 1;
    }
}

.div-title {
    border: 4px var(--primary);
    border-style: solid none;
    background-color: var(--accent);
}
</style>
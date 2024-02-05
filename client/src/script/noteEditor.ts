import { readonly, ref } from "vue"
import Overlay from '../components/Overlay.vue'
import { NoteType, initNotes } from "./notes"
import { notify } from "./notification"
import getAxios from "../plugins/axios"

export const overlay = ref<InstanceType<typeof Overlay>>()
const raw = ref('Nothing selected')
const note = ref<NoteType | null>(null)

export const Note = readonly(note)
export const RawMarkdown = readonly(raw)

export const changeNote = (newNote, selectedIndex) => {
    if (note.value !== null && note.value !== undefined && raw.value !== note.value.content) {
        overlay.value.openOverlay({
            title: 'Changes are unsaved',
            content: 'Would you like to save changes before leaving',
            buttons: [
                {
                    name: 'Yes',
                    primary: true,
                    action: () => {
                        saveNote()
                        overlay.value.closeOverlay()
                        updateEditor(newNote, selectedIndex)
                    }
                },
                {
                    name: 'No',
                    primary: false,
                    action: () => {
                        overlay.value.closeOverlay()
                        updateEditor(newNote, selectedIndex)
                    }
                }
            ]
        })
    } else { updateEditor(newNote, selectedIndex) }
}

const updateEditor = (newNote, selectedIndex) => {
    if (newNote !== undefined) {
        note.value = newNote
        note.value.selectedIndex = selectedIndex
        raw.value = note.value.content
    }
}

export const onUpdate = (e?) => {
    const textArea = document.getElementsByTagName('textarea')[0]
    if (e)
        raw.value = e.target.value
    textArea.setAttribute('style', 'height:' + (textArea.scrollHeight) + 'px - 52px')
}

export const deleteNote = () => {
    if (note.value.id === -1) return;
    overlay.value.openOverlay({
        title: `Delete the note: ${note.value.title}?`,
        buttons: [
            {
                name: 'Yes',
                primary: true,
                action: () => {
                    notify(`Deleted the note: ${note.value.title}`)
                    getAxios().post('/notes/delete', {
                        id: note.value.id
                    })
                        .then(() => initNotes(0))
                        .catch(error => console.log(error.response.data.error))
                    overlay.value.closeOverlay()
                }
            },
            {
                name: 'No',
                primary: false,
                action: () => overlay.value.closeOverlay()
            }
        ]
    })
}

export const saveNote = () => {
    notify(`Changes saved`)
    note.value.content = raw.value
    updateNote({
        id: note.value.id,
        content: raw.value,
        isPrivate: note.value.isPrivate
    })
}

export const togglePrivate = () => {
    updateNote({
        id: note.value.id,
        content: raw.value,
        isPrivate: !note.value.isPrivate
    })
    note.value.isPrivate = !note.value.isPrivate
    notify(`${note.value.title} is now a ${note.value.isPrivate ? 'private' : 'public'} note.`)
}

export const undoChanges = () => {
    overlay.value.openOverlay({
        title: 'Undo all changes?',
        buttons: [
            {
                name: 'Yes',
                primary: true,
                action: () => {
                    raw.value = note.value.content
                    overlay.value.closeOverlay()
                }
            },
            {
                name: 'No',
                primary: false,
                action: () => overlay.value.closeOverlay()
            }
        ]
    })
}

const updateNote = (noteData) => {
    if (note.value.id === -1) return;
    getAxios().post('/notes/update', noteData)
        .then(() => initNotes(note.value.selectedIndex))
        .catch(error => console.log(error.response.data.error))
}
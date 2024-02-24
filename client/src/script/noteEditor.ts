import { readonly, ref } from "vue"
import Overlay from '../components/Overlay.vue'
import { NoteType, initNotes } from "./notes"
import { notify } from "./notification"
import getAxios from "../plugins/axios"
import { useRoute } from "vue-router"

export const overlay = ref<InstanceType<typeof Overlay>>()
export const textArea = ref<HTMLTextAreaElement>()
const raw = ref('Nothing selected')
const note = ref<NoteType>({
    id: -1,
    title: 'No notes found',
    content: 'Login to create a note!',
    route: '',
    isPrivate: false,
    authorId: -1,
    authorName: '',
    selectedIndex: -1
})

export const Note = readonly(note)
export const RawMarkdown = readonly(raw)
console.log('')
export const changeNote = (newNote, selectedIndex) => {
    if (note.value.id !== -1 && raw.value !== note.value.content) {
        overlay.value?.openOverlay({
            title: 'Changes are unsaved',
            content: 'Would you like to save changes before leaving',
            buttons: [
                {
                    name: 'Yes',
                    primary: true,
                    action: () => {
                        saveNote()
                        overlay.value?.closeOverlay()
                        updateEditor(newNote, selectedIndex)
                    }
                },
                {
                    name: 'No',
                    primary: false,
                    action: () => {
                        overlay.value?.closeOverlay()
                        updateEditor(newNote, selectedIndex)
                    }
                }
            ]
        })
    } else {
        updateEditor(newNote, selectedIndex)
        onUpdate()
    }
}

const updateEditor = (newNote, selectedIndex) => {
    if (newNote !== undefined && newNote !== null) {
        note.value = newNote
        note.value.selectedIndex = selectedIndex
        raw.value = note.value.content
    }
}

export const onUpdate = (e?) => {
    if (textArea.value) {
        textArea.value.style.height = '18px';
        textArea.value.style.height = textArea.value.scrollHeight + 'px'
    }
    if (e)
        raw.value = e.target.value
}

export const deleteNote = () => {
    if (note.value.id === -1) return;
    overlay.value?.openOverlay({
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
                    overlay.value?.closeOverlay()
                }
            },
            {
                name: 'No',
                primary: false,
                action: () => overlay.value?.closeOverlay()
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
    overlay.value?.openOverlay({
        title: 'Undo all changes?',
        buttons: [
            {
                name: 'Yes',
                primary: true,
                action: () => {
                    raw.value = note.value.content
                    overlay.value?.closeOverlay()
                }
            },
            {
                name: 'No',
                primary: false,
                action: () => overlay.value?.closeOverlay()
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

export const copyLink = () => {
    navigator.clipboard.writeText(`${window.location}?id=${note.value.id}`)
    notify('Copied link to clipboard')
}

export const uploadImage = (data) => {
    return new Promise((resolve, reject) => {
        getAxios().post('/images/upload', { data })
            .then(response => resolve(response.data))
            .catch(error => reject(error.response.data.error))
    })
}
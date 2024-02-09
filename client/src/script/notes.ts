import { computed, readonly, ref } from "vue"
import store from "../store"
import getAxios from "../plugins/axios"
import { useRoute } from "vue-router";
import router from "../router";
import { changeNote } from "./noteEditor";

const notes = ref<Array<NoteType>>([])
const activeUser = ref(null);
const selected = ref(0)

export const showMenu = ref<boolean>(false)
export const Notes = readonly(notes)
export const Selected = readonly(selected)
export const ActiveUser = readonly(activeUser)

export const targetId = computed(() => {
    return useRoute() === undefined ? -1 : Number(useRoute().query.id)
})

export const initNotes = async (selection?) => {
    // Ensure user access is restricted
    if (store.getters.isAuthenticated) {
        getAxios().get('auth')
            .then(response => {
                if (response.data.valid)
                    activeUser.value = response.data.value
            }).catch(() => activeUser.value = null)
    }
    // format data for dispaly
    await getAxios().get('notes')
        .then(result => {
            // Map notes to a new array for dispaly
            if (result.data.value.length > 0) {
                notes.value = result.data.value.map(note => ({
                    id: note.id,
                    title: note.title,
                    content: note.content,
                    route: note.route,
                    isPrivate: note.private,
                    authorId: note['user.id'],
                    authorName: note['user.username']
                }))
                // Set title to active note
            } else {
                // If there are no notes push a placeholder
                notes.value = [{
                    id: -1,
                    title: 'No notes found',
                    content: 'Login to create a note!',
                    route: '',
                    isPrivate: false,
                    authorId: -1,
                    authorName: '',
                    selectedIndex: -1
                }]
            }
        }).catch(error => console.log(error))

    // Find the index of the target note
    if (notes.value[0].id !== -1 && selection === undefined) {
        notes.value.forEach((note, index) => {
            if (note.id === targetId.value) {
                selected.value = index
            }
        })
    } else {
        selected.value = selection
        router.replace('/notes')
    }
    //update editor component
    changeNote(notes.value[selected.value], selected.value)
    showMenu.value = false
}

export interface NoteType {
    id: number,
    title: string,
    content: string,
    route: string,
    isPrivate: boolean,
    authorName: string,
    authorId: number,
    selectedIndex: number
}
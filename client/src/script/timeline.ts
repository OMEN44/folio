import { readonly, ref } from "vue"
import getAxios from "../plugins/axios"
import { useCookies } from "vue3-cookies"

const timelineDisplayData = ref<TimelineEventType | null>(null)
const accessLevel = ref(3)

export const TimelineData = readonly(timelineDisplayData)
export const AccessLevel = readonly(accessLevel)

export const updateTimeline = (filters?) => {
    // If logged in check users access level
    if (useCookies().cookies.isKey('authToken')) {
        getAxios().get('/auth')
            .then(response => {
                if (response.data.valid)
                    accessLevel.value = response.data.value.access
            }).catch(() => { })
    } else accessLevel.value = 3

    // Get timeline data and format it
    getAxios().get('/timeline')
        .then(response => {
            if (response.data.value === undefined) return
            let rawData = response.data.value
            // filter for links option on filter
            if (filters && filters.onlyLinks)
                rawData = response.data.value.filter(event => {
                    return event.noteId !== null
                })
            // Filter for search term
            if (filters && filters.searchTerm !== '') {
                rawData = rawData.filter(event => {
                    return event.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
                        || event.about.toLowerCase().includes(filters.searchTerm.toLowerCase())
                        || event.date.toLowerCase().includes(filters.searchTerm.toLowerCase())
                })
            }
            // sort by date
            rawData.sort((a, b) => {
                if (filters && filters.oldest)
                    return a.date > b.date ? 1 : -1
                else
                    return a.date < b.date ? 1 : -1
            })
            // give first event in the year the newYear tag
            let currentYear = (filters && filters.oldest) ? 0 : 10000
            rawData.forEach((event) => {
                let isFirst = false
                const fullYear = new Date(event.date).getFullYear()
                if (filters && filters.oldest)
                    isFirst = fullYear > currentYear
                else
                    isFirst = fullYear < currentYear
                if (isFirst) {
                    currentYear = fullYear
                    event.newYear = true
                }
            })
            // Format the raw Data for display
            timelineDisplayData.value = rawData.map((project) => ({
                id: project.id,
                title: project.title,
                about: project.about,
                noteId: project.noteId,
                newYear: (project.newYear !== undefined),
                date: new Date(project.date)
            }))
        })
}

export interface TimelineEventType {
    id: number,
    title: string,
    noteId: number,
    about: string,
    newYear?: boolean,
    date: any
}
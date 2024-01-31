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
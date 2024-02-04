export interface OverlayType {
    title: string,
    content?: string,
    buttons:
    {
        name: string,
        primary: boolean,
        action: any
    }[]
}
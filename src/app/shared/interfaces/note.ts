export interface Note {
    id?: number,
    name: string,
    text: string,
    type: number,
    createDate: Date,
    editDate?: Date

}

export interface NoteType {
    id: number,
    name: string
}
export interface PageData<T> {
    content?: T[],
    first?: boolean,
    last?: boolean,
    number?: number,
    numberOfElements?: number,
    size?: number,
    totalElements?: number,
    totalPages?: number
}
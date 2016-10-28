export interface IMap<T> {
    [s: string]: T
}

export interface INameValue<T> {
    name: string
    value: T
}

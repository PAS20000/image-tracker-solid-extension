export type PageRequest = void
export type PageResponse = Promise<HTMLImageElement[]>

export type CreatePage = () => PageResponse
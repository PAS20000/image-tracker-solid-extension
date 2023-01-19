export type Extension = [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'gif',
    'svg'
][number]

export interface ImageRequest {
    id ?: string
    src : string
    alt : string
    host : string
    extension ?: Extension
    naturalWidth : number
    naturalHeight : number
    createdAt ?: Date
    updatedAt ?: Date
}

export interface ImageResponse {
    id : string
    createdAt : Date
    updatedAt : Date
    size : [number, number]
    describe : string
    extension : Extension
    host : string
    original_link : string
    blob : Blob
}

export type CreateImage = (req : ImageRequest) => Promise<ImageResponse>
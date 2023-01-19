import { ImageResponse } from "../../domain/interfaces/image"

export interface ImageRepositoryResponse {
    insert(image: ImageResponse): Promise<void>
    getAll() : Promise<ImageResponse[]>
    deleteAll() : Promise<void>
    bulkDelete(items : string[]) : Promise<void>
}

export type CreateImageRepository = () => ImageRepositoryResponse
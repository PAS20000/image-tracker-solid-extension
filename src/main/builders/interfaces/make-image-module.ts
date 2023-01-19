import { UseCaseGetAllImagesInDocumentResponse } from "../../../application/interfaces/get-all-images-in-document"
import { ImageRepositoryResponse } from "../../../application/models/image"
import { ImageRequest, ImageResponse } from "../../../domain/interfaces/image"
import { PageResponse } from "../../../domain/interfaces/page"

export type MakeImageModuleRequest = {
    page ?: PageResponse 
    repository ?: ImageRepositoryResponse
}

export interface MakeImageModuleResponse {
    getAllInDocument() : UseCaseGetAllImagesInDocumentResponse
    make(req : ImageRequest) : Promise<ImageResponse>
    register(req : ImageResponse) : Promise<void>
    readAll() : Promise<ImageResponse[]>
    deleteAll() : Promise<void>
    bulkDelete(items : string[]) : Promise<void>
}

export type CreateMakeImageModule = (config ?: MakeImageModuleRequest) => MakeImageModuleResponse
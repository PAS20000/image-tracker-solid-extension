export interface UseCaseGetAllImagesInDocumentRequest {
    images : HTMLImageElement[]
}

export type UseCaseGetAllImagesInDocumentResponse = Promise<void>

export type UseCaseCreateGetAllImagesInDocument = (req : UseCaseGetAllImagesInDocumentRequest) => UseCaseGetAllImagesInDocumentResponse

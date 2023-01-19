import { ImageResponse } from "../../domain/interfaces/image"
import { ImageRepositoryResponse } from "../models/image"

export interface UseCaseGetAllImagesInRepositoryRequest {
    repository : ImageRepositoryResponse
}

export type UseCaseGetAllImagesInRepositoryRespose = Promise<ImageResponse[]>

export type CreateUseCaseGetAllImagesInRepository = (req : UseCaseGetAllImagesInRepositoryRequest) => UseCaseGetAllImagesInRepositoryRespose
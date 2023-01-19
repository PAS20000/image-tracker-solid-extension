import { ImageResponse } from "../../domain/interfaces/image"
import { ImageRepositoryResponse } from "../models/image"

export interface UseCaseRegisterImageInDbRequest {
    image : ImageResponse
    repository : ImageRepositoryResponse
}

export type UseCaseRegisterImageInDbResponse = Promise<void>

export type CreateUseCaseRegisterImageInDb = (req : UseCaseRegisterImageInDbRequest ) => UseCaseRegisterImageInDbResponse
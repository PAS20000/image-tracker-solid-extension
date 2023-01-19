import { Extension } from "../../domain/interfaces/image"

export interface ImageInMessageModel  {
    id ?: string
    src : string
    alt : string
    host : string
    naturalWidth : number
    naturalHeight : number
    extension ?: Extension
    createdAt ?: Date
    updatedAt ?: Date
}
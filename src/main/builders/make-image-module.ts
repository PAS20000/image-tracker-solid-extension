import UseCaseGetAllImagesInDocument from "../../application/usecases/get-all-images-in-document";
import UseCaseGetAllImagesInRepository from "../../application/usecases/get-all-images-in-repository";
import UseCaseRegisterImageInDb from "../../application/usecases/register-image-in-db";
import EntityImage from "../../domain/entities/image";
import EntityPage from "../../domain/entities/page";
import { ImageRequest, ImageResponse } from "../../domain/interfaces/image";
import RepositoryImageIndexedDb from "../../infra/repositories/indexed-db/image-indexed-db";
import { CreateMakeImageModule } from "./interfaces/make-image-module";

const MakeImageModule : CreateMakeImageModule = (config = {}) => { 
    const repository = config.repository || new RepositoryImageIndexedDb()

    const make = (image : ImageRequest) => EntityImage(image)
    const getAllInDocument = async () => UseCaseGetAllImagesInDocument({ images : await EntityPage() })
    const register = (image: ImageResponse) => UseCaseRegisterImageInDb({ image, repository })
    const readAll = () => UseCaseGetAllImagesInRepository({ repository })
    const deleteAll = async () => await repository.deleteAll()
    const bulkDelete = async (items : string[]) => await repository.bulkDelete(items)

    return {
        getAllInDocument,
        register,
        readAll,
        make,
        deleteAll,
        bulkDelete
    }
}

export default MakeImageModule
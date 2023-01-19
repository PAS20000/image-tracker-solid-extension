import { CreateUseCaseGetAllImagesInRepository } from "../interfaces/get-all-images-in-repository"

const UseCaseGetAllImagesInRepository : CreateUseCaseGetAllImagesInRepository = async ({ repository }) => {
    return await repository.getAll()
}

export default UseCaseGetAllImagesInRepository
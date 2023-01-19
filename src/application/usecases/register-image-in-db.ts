import { CreateUseCaseRegisterImageInDb } from "../interfaces/register-image-in-db";

const UseCaseRegisterImageInDb : CreateUseCaseRegisterImageInDb = async ({ image, repository }) => {
    await repository.insert(image)
}

export default UseCaseRegisterImageInDb
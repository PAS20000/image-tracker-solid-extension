import { ImageInMessageModel } from "../../presentation/models/image-in-message"
import { UseCaseCreateGetAllImagesInDocument } from "../interfaces/get-all-images-in-document"

const UseCaseGetAllImagesInDocument : UseCaseCreateGetAllImagesInDocument = ({ images }) => new Promise(
    (resolve) => {
        for (const image of images) {
            image.onload = async () => {
                const response : ImageInMessageModel = {
                    alt : image.alt,
                    host : window.location.host,
                    naturalHeight : image.naturalHeight,
                    naturalWidth : image.naturalWidth,
                    src : image.src
                }
    
                resolve(await chrome.runtime.sendMessage({ image : response }))
            }
        }
    }
)

export default UseCaseGetAllImagesInDocument
import { Extension } from "../interfaces/image"
import { CreateUrl } from "../interfaces/url"

const EntityUrl : CreateUrl = async ({ url }) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const type = blob.type
    const isImage = type.indexOf('image') !== -1
    const isJpeg = type.toLowerCase().indexOf('jpeg') !== -1 && 'jpeg'
    const isPng = type.toLowerCase().indexOf('png') !== -1 && 'png'
    const isJpg = type.toLowerCase().indexOf('jpg') !== -1 && 'jpg'
    const isWebp = type.toLowerCase().indexOf('webp') !== -1 && 'webp'
    const isGif = type.toLowerCase().indexOf('gif') !== -1 && 'gif'
    const result = [
        isJpeg,
        isJpg,
        isPng,
        isJpeg,
        isGif,
        isWebp
    ].filter(item => !!item)[0] as Extension | false

    const extension = result ? result : 'webp'

    return {
        extension,
        isImage,
        blob,
        response 
    }
}

export default EntityUrl
import { CreateImage, Extension } from "../interfaces/image";
import EntityUrl from "./url";

const EntityImage : CreateImage = async ({ 
    alt, 
    host, 
    src, 
    createdAt, 
    id, 
    updatedAt, 
    naturalHeight, 
    naturalWidth
}) => {
    const { extension, blob } = await EntityUrl({ url : src })

    return {
        id : id ?? crypto.randomUUID(),
        blob,
        createdAt : createdAt ?? new Date(),
        updatedAt : updatedAt ?? new Date(),
        describe : alt,
        host,
        extension,
        original_link : src,
        size : [
            naturalWidth,
            naturalHeight
        ]
    }
}

export default EntityImage
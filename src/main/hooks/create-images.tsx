import { createSignal } from 'solid-js'
import { ImageResponse } from '../../domain/interfaces/image'
import { images } from '../../presentation/extension/background'

export default class CreateImages {

   getImages(end ?: number) {
        const img = images()
        const slice = img.slice(0, end ?? img.length)
        
        return {
            values : slice,
            length : slice.length
        }  
    }

    getBytes(end ?: number) {
        let bytes = 0
        const array = this.getImages(end).values

        for (const image of array) {
            bytes += image.blob.size
        }

        return bytes
    }

    getZipSize = (end ?: number) => {
        const bytes = this.getBytes(end)
        const kb = bytes / 1024
        const mb = bytes / 1048576
        const gb = bytes / 1073741824

        if (mb > 1024) {
            return gb.toFixed(2) + 'Gb' 
        } else {
            return mb.toFixed(2) + 'Mb'
        }
    }

    getImageSizes(image : ImageResponse) {
        const bytes = image.blob.size

        return  {
            b : bytes.toFixed(2),
            kb : (bytes / 1024).toFixed(2),
            mb : (bytes / 1048576).toFixed(2),
            gb : (bytes / 1073741824).toFixed(2)
        }
    }
}
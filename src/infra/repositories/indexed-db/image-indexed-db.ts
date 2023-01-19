import { ImageRepositoryResponse } from "../../../application/models/image"
import Pixel from "./pixel/pixel"

export default class RepositoryImageIndexedDB implements ImageRepositoryResponse {
    readonly client = new Pixel({
        dbName : 'Image_Tracker_DB',
        storeName : 'Images',
        version : 1,
        table : [
          '@original_link',
          'host',
          'describe',
          'size'
        ]
    })

    async insert(image : any) {
        const store = await this.client.connect()
        await store.put(image)
    }

    async getAll() {
        const store = await this.client.connect()
        const images = await store.read().all()

        return images
    }

    async deleteAll() {
        const store = await this.client.connect()
        await store.deleteAll()
    }

    async bulkDelete(items: string[]) {
        const store = await this.client.connect()
        store.bulkDelete(items)
    }
}
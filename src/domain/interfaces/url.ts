import { Extension } from "./image";

export interface UrlRequest {
    url : string
}

export type UrlObj = {
    extension: Extension
    isImage: boolean;
    blob: Blob;
    response: Response;
}

export type UrlResponse = Promise<UrlObj>

export type CreateUrl = (req : UrlRequest) => UrlResponse
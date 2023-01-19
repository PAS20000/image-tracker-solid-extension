import { CreatePage } from "../interfaces/page";
import EntityUrl from "./url";

const EntityPage : CreatePage = () => new Promise(
    async (resolve : (value : HTMLImageElement[]) => void) => {
        const html = document.images
        const images : HTMLImageElement[] = []
        for (const element of html) {
           if (element instanceof HTMLElement) {
               if (element.dataset['status'] !== '💜tracked💜') {
                    element.dataset['status'] = '💜tracked💜'
                    const src = element.src
                    if (src) {
                        if (src.indexOf('https') > -1 || src.indexOf('http') > -1) {
                            const { isImage } = await EntityUrl({ url : src })

                            if (isImage) {
                                const img = new Image()
                                img.src = src
                                img.alt = element.alt ?? 'without description'
                                img.title = element.title ?? 'image tracked by image tracker'
                                images.push(img)
                            }
                        }
                    }
                }
            }
        }

        resolve(images)
    }
)

export default EntityPage
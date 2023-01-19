import { CreatePage } from "../interfaces/page";
import EntityUrl from "./url";

const EntityPage : CreatePage = () => new Promise(
    async (resolve : (value : HTMLImageElement[]) => void) => {
        const html = document.getElementsByTagName('*')
        const images : HTMLImageElement[] = []
        for (const element of html) {
           if (element instanceof HTMLElement) {
               if (element.dataset['status'] !== '💜tracked💜') {
                    const attributes = element.attributes
                    const backgroundImage = getComputedStyle(element).backgroundImage?.replace('url(','').replace(')','')
                    const src = attributes.getNamedItem('src')?.value
                    const srcset = attributes.getNamedItem('srcset')?.value
                    const alt = attributes.getNamedItem('alt')?.value
                    const title = attributes.getNamedItem('title')?.value
                    const dataSet = Object.values(element.dataset)
                    const urls = [
                        backgroundImage,
                        src,
                        srcset,
                        ...dataSet
                    ]
                    element.dataset['status'] = '💜tracked💜'
                    if (urls.length) {
                        for (const url of urls) {
                            if (url) {
                                if (url.indexOf('https') > -1 || url.indexOf('http') > -1) {
                                    const { isImage } = await EntityUrl({ url })

                                    if (isImage) {
                                        const img = new Image()
                                        img.src = url
                                        img.alt = alt ?? 'without description'
                                        img.title = title ?? 'image tracked by image tracker'
                                        images.push(img)
                                    }
                                }
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
import JSZip from 'jszip';
import { createSignal } from 'solid-js';
import { ImageResponse } from '../../domain/interfaces/image';

const createZip = () => {
    const [isFallBack, setIsFallBack] = createSignal(false)
    const create = async (images : ImageResponse[]) => {
        setIsFallBack(true)
        const zip = new JSZip()
        const uniqueHosts = [
            ...new Set(
                images.map(({ host }) => host)
            )
        ]
        for (let Host of uniqueHosts) {
            const currentStorage = images.filter(({ host }) => Host === host)
            const folder = zip.folder(Host) as JSZip
            let i = 0
            for (const { blob, describe, extension } of currentStorage) {
                i++
                folder.file(`${i + '-' + describe}.${extension}`, blob)
            }
        }
        zip.file(`Hello-you-downloaded-${images.length}-images-from-${uniqueHosts.length}-sites.txt`, `
            You downloaded ${images.length} images from ${uniqueHosts.length} sites
            👋 Thanks for using the 🎯 image tracker 🎯!
            join our discord server : https://discord.com/invite/2kyjbbjBwe
            website : https://imagetracker.org
        `)

        const blob = await zip.generateAsync({ type : 'blob' })
        const link = URL.createObjectURL(blob)
        setIsFallBack(false)
        
        return {
            blob,
            link,
        }
    }
   
   return {
        create,
        isFallBack,
        setIsFallBack,
        async download(images :ImageResponse[]){
            const Zip = await create(images)
            const a = document.createElement('a')
            a.href = Zip.link
            a.download = 'Image-Tracker-Zip-Images'
            a.target = '_blank'
            a.click()
            a.remove()
            URL.revokeObjectURL(Zip.link)
      }
   }
}

export default createZip
import { FaSolidTrash, FaSolidDownload, FaSolidEye, FaSolidTag, FaSolidImage } from 'solid-icons/fa'
import css from '../styles/card.module.css'
import { createSignal } from 'solid-js'
import Modal from './modal'
import Image from './image'
import Button from './button'
import Input from './input'
import Title from './title'
import CreateImages from '../hooks/create-images'
import OpenWindowPopup from '../../utils/open-window-popup'
import { ImageResponse } from '../../domain/interfaces/image'
import MakeImageModule from '../builders/make-image-module'
import { setImages } from '../../presentation/extension/background'

interface Props {
    image : ImageResponse
}

const Card = ({ image } : Props) => {
    let cardRef : HTMLDivElement | undefined
    let imageRef : HTMLImageElement | undefined
    const [isOpen, setIsOpen] = createSignal(false)
    const { getImageSizes } = new CreateImages()
    const sizes = getImageSizes(image)
    const src = URL.createObjectURL(image.blob)
   
    const remove = async () => {
        if (cardRef) {
            const builder = MakeImageModule()
            await builder.bulkDelete([image.id])
            setImages(await builder.readAll())
        }
    }

    return (
        <div class={css['container-image-and-tools']} ref={cardRef}> 
            <Image src={src}/>
            <div class={css['container-tools']}>
                <Button  onClick={() => setIsOpen(true)}>
                    <FaSolidEye />
                </Button>
                <Button>
                    <a href={src} download={`${image.describe}.${image.extension}`} target='_blank'>
                        <FaSolidDownload />
                    </a>
                </Button>
                <Button onClick={remove}>
                    <FaSolidTrash />
                </Button>
            </div>
            {isOpen() && (
                    <Modal close={() => setIsOpen(false)} background={src}>
                        <Image 
                            boxStyle='modal'
                            src={src}
                            screen
                            ref={imageRef}
                        />
                        <div class={css['right']}>
                            <Title 
                                icon={<FaSolidImage />}
                                text='Information'
                            />
                            <Input
                                icon={<FaSolidTag />}
                                label='website'
                                value={image.host}
                            />
                            <Input 
                                icon={<FaSolidTag />}
                                label='describe'
                                value={image.describe}
                            />
                            <Input 
                                icon={<FaSolidTag />}
                                label='extension'
                                value={image.extension}
                            />
                            <Input 
                                icon={<FaSolidTag />}
                                label='size'
                                value={`${sizes.kb} kb`}
                            />
                            <Input 
                                icon={<FaSolidTag />}
                                label='original link'
                                value={image.original_link}
                                onClick={() => OpenWindowPopup(image.original_link).left()}
                            />
                            <Input
                                icon={<FaSolidTag />}
                                label='width'
                                value={image.size[0] + 'px'}
                            />
                            <Input 
                                icon={<FaSolidTag />}
                                label='height'
                                value={image.size[1] + 'px'}
                            />
                            <Input 
                                icon={<FaSolidTag />}
                                label='created at'
                                value={new Date(image.createdAt).toLocaleDateString('en-US')}
                            />
                            <Input 
                                icon={<FaSolidTag />}
                                label='updated at'
                                value={new Date(image.updatedAt).toLocaleDateString('en-US')}
                            />
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}

export default Card
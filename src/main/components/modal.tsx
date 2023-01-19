import { JSX } from 'solid-js'
import { AiFillCloseCircle } from 'solid-icons/ai'
import { Portal } from 'solid-js/web'
import Button from './button'
import css from '../styles/modal.module.css'
import Title from './title'

interface Props {
    children : JSX.Element
    background ?: string
    close : () => void
}

const Modal = ({ children, background, close } : Props) => {

    return (
        <Portal mount={document.getElementById('portal') as HTMLDivElement}>
            <img 
                src={background ?? 'https://imagetracker.org/media/utils/banner-image-tracker.webp'}
                class={css['background']} 
                onClick={close}
            />
            <span class={css['close-button']} >
                <Button onClick={close}>
                    <AiFillCloseCircle />
                </Button>
            </span>
            <div class={css['container']}>
                {children}
            </div>
        </Portal>
    )
}

export default Modal
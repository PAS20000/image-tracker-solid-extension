import { IoWarning } from 'solid-icons/io'
import css from '../styles/loading.module.css'

const Loading = () => {
    return (
        <div class={css['container']}>
            <h1>
               <IoWarning style={{ transform : 'translate(0px, 3px)'}} /> There are no images to show
            </h1>
            <h2>
                Scroll down the page to capture the images
            </h2>
            <img 
                src="https://imagetracker.org/media/utils/pokimane-instagram-profile-downloading-photos-11-19-2022.webp" 
                alt="downloading photos" 
                loading="lazy"
                width='100%'
                height='auto'
            />
        </div>
    )
}

export default Loading
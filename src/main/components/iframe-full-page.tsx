import css from '../styles/iframe-full-page.module.css'

interface Props {
    src : string
}

const IframeFullPage = ({ src } : Props) => {

    return (
        <iframe src={src} class={css['iframe']}>
            Your browser does not support iframes
        </iframe>
    )
}

export default IframeFullPage
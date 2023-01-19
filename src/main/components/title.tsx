import styles from '../styles/title.module.css'
import { JSX } from 'solid-js'

interface Props {
    icon ?: JSX.Element
    text : string
}

const Title = ({ text, icon } : Props) => {

    return (
        <h1 class={styles['container']}>
            {icon}
            {text}
        </h1>
    )
}

export default Title
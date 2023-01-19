import css from '../styles/layout.module.css'
import { JSX } from 'solid-js'

interface Props {
    children ?: JSX.Element
}

const Layout = ({ children } : Props) => {

    return (
        <div class={css['flex']}>
            {children}
        </div>
    )
}

export default Layout
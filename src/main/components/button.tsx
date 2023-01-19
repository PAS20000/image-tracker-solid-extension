import { JSX } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import css from '../styles/button.module.css'

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
    children : JSX.Element
    as ?: string
    disabled ?: boolean
}

const Button = (props : Props) => {

    const divProps : Props = {
        ...props,
        as : undefined,
        children : undefined,
        class : undefined
    }

    return (
        <div class={css[props.class ?? 'container']} {...divProps}>
            <Dynamic component={props.as ?? 'button'} disabled={props.disabled}>
                {props.children}
            </Dynamic>
        </div>
    )
}

export default Button
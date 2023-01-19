import CreateZoomStyleAnimation from "../hooks/create-zoom-style-animation"
import css from '../styles/image.module.css'

interface Props {
    screen ?: boolean
    src : string
    w ?: string
    h ?: string
    boxStyle ?: [
        'modal',
        'card'
    ][number]
    ref ?: any
}

const Image = ({ src, w, h, boxStyle, screen, ref } : Props) => {
    const { ZoomIn, ZoomOut, ZoomReset, mouseMove, styles } = CreateZoomStyleAnimation({
        screen : screen
    })

    return (
        <div class={css[`box-${boxStyle ?? 'card'}`]}
            onDragStart={(e) => e.preventDefault()}
            onClick={ZoomIn}
            onContextMenu={(e) => ZoomOut(e)} 
            onMouseEnter={ZoomIn}
            onMouseLeave={ZoomReset}
        >
            <img 
                onMouseMove={(e) => mouseMove(e)}
                src={src} 
                width={w ?? '100%'}
                height={h ?? '100%'}
                style={styles()}
                ref={ref}
            />
        </div>
    )
}

export default Image
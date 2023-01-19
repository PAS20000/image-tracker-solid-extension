import { createStore } from 'solid-js/store'
import { JSX } from 'solid-js'

const CreateZoomStyleAnimation = ({ screen } = {} as {screen ?: boolean }) => {
    const [store, setStore] = createStore({
        scale : 1,
        transition : '0.2s',
        origin : 'center center'
    })
    const ZoomIn = () => {
        setStore(current => {
            return {
                ...current,
                transition : '0.2s',
                scale : store.scale + 0.25
            }
        })
    }
    const ZoomOut = (e : MouseEvent) => {
        e.preventDefault()
        setStore({
            transition : '0.3s',
            scale : store.scale - 0.25
        })
    }
    const ZoomReset = () => {
        setStore({
            transition : '1s ease-in-out',
            scale : 1,
        })
    }
    const mouseMove = (e : any ) => {
        if (screen) {
            setStore(current => {
                const x =  e.pageX - e.currentTarget.offsetLeft
                const y = e.screenY - e.currentTarget.offsetTop
                return {
                    ...current,
                    transition : '0.1s',
                    origin : `${x}px ${y}px`
                }
            })
        } else {
            setStore(current => {
                const x = /*Carousel.scrollLeft*/
                e.pageX - e.currentTarget.offsetLeft
                const y = e.pageY - e.currentTarget.offsetTop
                return {
                    ...current,
                    transition : '0.1s',
                    origin : `${x}px ${y}px`
                }
            })
        }
    }

    const styles = () : JSX.CSSProperties => {
        return {
            transition : `${store.transition}`,
            transform : `scale(${store.scale})`,
            'transform-origin' : store.origin
        }
    } 

    return {
        mouseMove,
        ZoomIn,
        ZoomReset,
        ZoomOut,
        styles,
        setStore,
        store
    }
}

export default CreateZoomStyleAnimation
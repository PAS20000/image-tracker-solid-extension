import { FaSolidPlus } from 'solid-icons/fa'
import { RiDocumentFolderZipFill, RiSystemSubtractFill } from 'solid-icons/ri'
import { createSignal, JSX, onMount } from 'solid-js'
import CreateImages from '../hooks/create-images'
import css from '../styles/progress.module.css'
import Button from './button'

interface Props {
    progress : number
    max : number
    icon : JSX.Element
    title : string
    count ?: boolean
}

const Progress = ({ progress, max, count, icon, title } : Props) => {
    const { getZipSize } = new CreateImages()
    const [getProgress, setProgress] = createSignal(progress)
    const [getMax, setMax] = createSignal(max)
    let incRef : HTMLDivElement | undefined
    let decRef : HTMLDivElement | undefined

    const createProgressPercent = () : number => {
        if (getProgress() !== 0) {
            const percent = (getProgress() * 100) / getMax()
            return percent
        } else {
            return 0
        }
    }

    onMount(() => {
        let timer : NodeJS.Timeout

        const increment = () => {
            setProgress(c => {
                if (c < getMax()) {
                    return c + 1
                } else {
                    return c
                }
            })

            timer = setTimeout(increment, 1)
        }
    
        const decrement = () => {
            setProgress(c => {
                if (c > 0) {
                    return c - 1
                } else {
                    return c
                }
            })

            timer = setTimeout(decrement, 1)
        }

        const reset = () => {
            clearTimeout(timer)
        }

        if (incRef && decRef) {
            incRef.addEventListener('mousedown', increment)
            decRef.addEventListener('mousedown', decrement)
            incRef.addEventListener('mouseup', reset)
            incRef.addEventListener('mouseleave', reset)
            decRef.addEventListener('mouseup', reset)
            decRef.addEventListener('mouseleave', reset)
        }
    })

    return (    
    <>  
        <h2>
           {icon} {title}
        </h2>
        <div class={css['info']}>
            <h3>
                size {'->'} {getZipSize(getProgress())}
            </h3>
        </div>
        <div class={css['container']}>
            <Button ref={decRef}>
                <RiSystemSubtractFill />
            </Button>
            <div class={css['void-bar']}>
                <div class={css['progress']} data-progress={count ? 
                    getProgress().toLocaleString(navigator.language)
                    : 
                    createProgressPercent().toFixed(2)}
                    style={{
                        width : `${createProgressPercent()}%`
                    }}
                />
            </div>
            <Button ref={incRef}>
                <FaSolidPlus />
            </Button>
        </div>
    </>
        
    )
}

export default Progress
import { FaSolidEye, FaSolidEyeSlash } from 'solid-icons/fa'
import { JSX, createSignal } from 'solid-js'
import css from '../styles/input.module.css'

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label : string
    icon ?: JSX.Element
    dataLength ?: string | number
}

const Input = (props : Props) => {
    let input : HTMLInputElement | undefined
    const [isShowPassword, setIsShowPassword] = createSignal(false)

    const ShowPassword = () => {
        if (input) {
          if (input.type === 'text') {
            input.type = 'password'
            setIsShowPassword(false)
          } else {
            input.type = 'text'
            setIsShowPassword(true)
          }
        }
    }

    const InputProps = {
        ...props,
        icon : undefined,
        label : undefined,
        dataLength : undefined,
        onClick : undefined
    }

    return (
        <div 
            onClick={props.onClick as any}
            class={css[props.disabled ? 'disabled' : 'container']}
            title={props.disabled ? 
                'This field is not required'
                :
                ''
            }
        >
            {props.type === 'password' ? 
                <>
                    <label 
                        for={props.label} 
                        onClick={ShowPassword} 
                        class={css['label']} 
                        data-length={props.dataLength}
                    >
                        <div>
                            {isShowPassword() ? 
                                <FaSolidEye />    
                                :
                                <FaSolidEyeSlash />
                            }
                        </div>&nbsp;
                        {props.label}
                    </label>
                    <input {...InputProps} ref={input} class={css['input']}></input>
                </> 
                :
                <> 
                    <label for={props.label} class={css['label']} data-length={props.dataLength}>
                        <div>
                            {props.icon}
                        </div>&nbsp;
                        {props.label}
                    </label>
                    <input {...InputProps} ref={input} class={css['input']}></input>
                </>
            }
        </div>
    )
}
export default Input
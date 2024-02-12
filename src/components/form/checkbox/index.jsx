import cls from './checkboz.module.scss'

export default function CheckBox({
    text, text2, value, className, onClick, ...other
}

) {
    return (
        <div className={cls.CheckBox}
            onClick={onClick}
            {...other} >
            <div className={className && className}></div>
            <p> {text}</p>
            <p> {text2} </p>
        </ div>
    )
}
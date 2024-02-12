import cls from './typeProfile.module.scss'

export default function TypeProfile({ className, title, text, onMouseEnter, onClick, onMouseLeave, ...other }) {
    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`${cls.TypeProfile} ${className && className}`} onClick={onClick} {...other}>
            <p>{title}</p>
            {text && <span>{text}</span>}
        </div>
    )
}

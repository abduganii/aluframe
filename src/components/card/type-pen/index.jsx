import cls from './window.module.scss'
import { Imagecons } from '../../icons'

export default function PenTypeCard({ title, img, onClick,onMouseEnter,onMouseLeave, className, ...other }) {

    return (
        <div className={`${cls.WindowCard} `} {...other} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
            <div className={`${cls.WindowCard__img} ${className && className}`}>
                {
                    img ? <img src={img} alt={"img"} /> :
                        <Imagecons />
                }
            </div>
            <p className={cls.WindowCard__text}>{title}</p>
        </div>
    )
}

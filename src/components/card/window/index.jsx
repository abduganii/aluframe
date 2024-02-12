import cls from './window.module.scss'
import { Imagecons } from '../../icons'

export default function WindowCard({ title, img, onClick, className, ...other }) {

    return (
        <div className={`${cls.WindowCard}`} {...other} onClick={onClick}>
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

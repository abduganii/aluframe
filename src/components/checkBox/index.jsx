import { CheckedIcon } from '../icons'
import cls from './checkBoz.module.scss'

export default function CheckedIcons({ onClick, value }) {
  
    return (
        <label className={cls.CheckBox}>
            <input type={"checkbox"} onChange={onClick} />
            <div className={`${cls.CheckBox__round} ${value ? cls.CheckBox__round__active : ""}`}>
                <CheckedIcon />
            </div>
        </label>
    )
}

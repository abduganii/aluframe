import { useSearchParams } from 'react-router-dom'
import { CheckedIcon } from '../../icons'
import cls from './checkBoz.module.scss'

export default function CheckBox({ onClick, id }) {
    const [params] = useSearchParams()
    return (
        <label className={cls.CheckBox}>
            <input type={"checkbox"} onChange={onClick} />
            <div className={`${cls.CheckBox__round} ${params.get('selectdeleteId') == "all" ? cls.CheckBox__round__active : ""}`}>
                <CheckedIcon />
            </div>
        </label>
    )
}

import { useSearchParams } from 'react-router-dom'
import paramsToObject from '../../../hooks/paramsToObject'
import CheckBox from '../form/checkBox'
import cls from './topList.module.scss'

export default function TopList(
    {
        array = [],
        SelectAll,
        ...other
    }
) {
    const [params, setSearchParams] = useSearchParams()
    return (
        <ul className={cls.TopList}>
            <li>
                <CheckBox onClick={() => {
                    if (params.get("selectdeleteId") == "all") {
                        setSearchParams({ ...paramsToObject(params.entries()), selectdeleteId: "" })
                    } else {
                        setSearchParams({ ...paramsToObject(params.entries()), selectdeleteId: "all" })
                    }
                }} />
            </li>
            {
                array?.map((e, i) => (
                    <li className={`${cls.TopList__item}  ${e === "Фото" || e === "Фото2" ? cls.TopList__item__img : ""} `} key={i}>{e}</li>
                ))
            }
        </ul >
    )
}

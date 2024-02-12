import { useState } from 'react'
import CheckBox from '../../form/checkbox'
import cls from './openType.module.scss'

const arr = [1, 2, 3, 4, 5, 6]
export default function OpenTypeOne({
    value,
    setValue,
    openTypeX1,
    setOpenTypeX1,
    openTypeX2,
    setOpenTypeX2,
    arr=[],
    openTypeY,
    setOpenY
}) {
    
    const [open, setOpen] = useState(true)
    return (
        <div className={cls.OpenTypeOne}>
            {arr?.length ? <>
                <h3 className={cls.OpenTypeOne__title}>Количество петель
                на 1 фасад</h3>
            <div className={cls.OpenTypeOne__conount}>

                {arr?.map((e,i) => (
                    <div key={i} className={`${cls.OpenTypeOne__conount__one} ${value == e?.id ? "focus" : ""}`} onClick={()=>setValue(e)}>{e?.number}</div>
                ))}
            </div>
            
            </>:""}
            <p className={cls.OpenTypeOne__text}>
                Присадочные размеры по умолчанию (стандарты) X= 100мм
            </p>
            <p className={cls.OpenTypeOne__rek}>Рекомендации</p>
            <h3 className={cls.OpenTypeOne__title2}>Устраивают ли наши размеры присадки (стандарты)?</h3>

            <CheckBox
                text={"Да"}
                text2={"Нет"}
                style={{ maxWidth: "190px", marginBottom: "27px" }}
                className={!open ? cls.mainCheckValueRight : ""}
                onClick={() => setOpen(!open)}
            />

            {
                !open && <>
                    <label className={cls.OpenTypeOne__input}>
                        <input type="number" placeholder='мм' value={openTypeX1} onChange={(e) => setOpenTypeX1(e.target.value)} />
                        <p>X₁</p>
                        <div></div>
                    </label>
                    <label className={cls.OpenTypeOne__input}>
                        <input type="number" placeholder='мм' value={openTypeX2} onChange={(e) => setOpenTypeX2(e.target.value)} />
                        <p>X₂</p>
                        <div></div>
                    </label>
                    <label className={cls.OpenTypeOne__input}>
                        <input type="number" placeholder='мм' value={openTypeY} onChange={(e) => setOpenY(e.target.value)} />
                        <p>Y₁</p>
                        <div></div>
                    </label>
                </>
            }
        </div>
    )
}

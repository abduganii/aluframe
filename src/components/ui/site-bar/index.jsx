import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom'
import paramsToObject from '../../../hooks/paramsToObject'
import { useGetWindowWidth } from '../../../hooks/useGetWindowWith'
import { CaltIcon, DoteIcon, ProfielIcon, UpIcan } from '../icons'
import { SiteBarArr,SiteBarArrForAdmin,SiteBarArrForClinet } from './data'
import cls from "./siteBar.module.scss"


export default function SiteBar({role,user}) {
    const pashName = useLocation()
    const [params, setSearchParams] = useSearchParams()
    const windowWidth = useGetWindowWidth()
    const [arrList,setArrList] = useState([])
    useEffect(() => {
        if (role == "superadmin") {
            setArrList(SiteBarArr)    
        }else if (role == "admin") {
            setArrList(SiteBarArrForAdmin)
        } else{
            setArrList(SiteBarArrForClinet)
        }
    }, [role])
        console.log(role)
    return (
        <div className={`${cls.SiteBar} ${params.get("openMadal") == "true" ? cls.SiteBar__open:"" }`}>
            <div>
                <div className={cls.SiteBar__logo}>
                    <DoteIcon color={"#484038"} />
                    {
                        windowWidth < 1240 ?  <div className={cls.SiteBar__burger} onClick={() =>
                setSearchParams({
                  ...paramsToObject(params.entries()),
                  openMadal: false,
                })
            }>

                    </div>:""
                    }
                </div>
                <div className={cls.SiteBar__profile}>
                    <div className={cls.SiteBar__Avatar}>
                        <ProfielIcon />
                        <img src="/Avatar.png" alt="" />
                    </div>
                    <div className={cls.SiteBar__profile_wrap}>
                        <h2 className={cls.SiteBar__profile__title}>{ user?.name}</h2>
                        <p className={cls.SiteBar__profile__text}>{role ==="user" ?"Заказчик":"Администратор"}</p>
                    </div>
                </div>

                <ul className={cls.SiteBar__list}>
                    <a target='_blank' href='/' className={cls.SiteBar__list__link}>
                        <div> <CaltIcon coler={"#484038"} /> <p>Калькулятор</p></div>
                    </a>
                    {
                        arrList?.map(e => (
                            <li key={e?.id} className={cls.SiteBar__list__item}>


                                <NavLink className={`${cls.SiteBar__list__link} ${pashName?.pathname?.includes(e?.link) ? cls.SiteBar__list__linkActive : ""}`} to={e?.link + e?.quary}>
                                    <div>
                                        {e?.icon(pashName?.pathname?.includes(e?.link) ? "white" : "#484038")} <p>{e?.text}</p>
                                    </div>
                                    {e?.array?.length && !pashName?.pathname?.includes(e?.link) ? <UpIcan /> : ""}
                                </NavLink>
                                {e?.array?.length && pashName?.pathname?.includes(e?.link) ?
                                    <div className={cls.SiteBar__list__child}>
                                        {
                                            e?.array?.map(el => (
                                                <NavLink to={el?.link + el?.quary} className={`${cls.SiteBar__list__childLink} ${pashName?.pathname == el?.link ? cls.SiteBar__list__childLinkActive : ""}`} key={el?.id} >
                                                    {el?.text}
                                                </NavLink>
                                            ))
                                        }
                                    </div>
                                    : ""
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>

            <p className={cls.SiteBar__Getter}>
                Сделана в: <br />
                <a href='https://getter.uz/' target="_blank">Getter</a>
            </p>
        </div>
       
    )
}

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import paramsToObject from "../../../hooks/paramsToObject";
import { useGetWindowWidth } from "../../../hooks/useGetWindowWith";
import { Loginout } from "../../../services/auth";
import {
  Editcan,
  LeftIcan,
  LououtIcan,
  RefreshIcan,
  RightIcan,
} from "../icons";
import { SiteBarArr } from "../site-bar/data";

import cls from "./header.module.scss";

export default function Header() {
 
  const [params, setSearchParams] = useSearchParams()
  const pashName = useLocation();
  const windowWidth = useGetWindowWidth()
  const navigate = useNavigate()
  const [Head, setHead] = useState();
  const goBack = () => {
    window.history.back();
  };

  const goForward = () => {
    window.history.forward();
  };
  const handleRefresh = () => {

    window.location.reload();
  };
  useEffect(() => {
    SiteBarArr?.forEach((e) => {
      if (e?.link == pashName?.pathname) {
        setHead(e?.text);
      }
      if (e?.link != pashName?.pathname && e?.array?.length) {
        e?.array?.map((el) => {
          if (el?.link == pashName?.pathname) {
            setHead(el?.text);
          }
        });
      }
    });
  }, [pashName]);
  return (
    <header className={cls.Header}>
      <div className={cls.Header__control}>
        {windowWidth < 1240 ? <span className={`${cls.Header__burget}`} onClick={() =>
                setSearchParams({
                  ...paramsToObject(params.entries()),
                  openMadal: true,
                })
            }>
          
        </span>:""}
        <div onClick={goBack}>
          <LeftIcan />
        </div>
        <div onClick={goForward} >
          <RightIcan />
        </div>
        <p className={cls.Header__control__text}>{Head}</p>
      </div>
      <div className={cls.Header__icons}>
        <div onClick={handleRefresh}>
          <RefreshIcan />
        </div>
        <div>
          <Editcan />
        </div>
        <div onClick={async()=> {
          await Loginout()
          navigate('/auth/login')
        }}>
          <LououtIcan />
        </div>
      </div>
    </header>
  );
}

import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import paramsToObject from "../../../hooks/paramsToObject";
import BlueBtn from "../button/blue-buttun";
import DropDawn from "../dropdawn";
import { Checked, DawnIcan, DeleteIcon, PlusIcon } from "../icons";
import { statusOder } from "./data";
import cls from "./filter.module.scss";

export default function Filter({
  SelectAll,
  deleteAll,
  Create,
  page,
  role,
  ...other
}) {
  const [params, setSearchParams] = useSearchParams();
  const [openStatus, setOpenSatus] = useState(false);
  const navigate = useNavigate()
  const [bac, setbac] = useState(false);
  const back = useRef();
  return (
    <div className={cls.Filter}>
      <div className={cls.Filter__filters}>
        <input
          className={`${cls.Filter__filters__input} ${cls.Filter__filters__search} ${page == "order" ? cls.Filter__filters__order:""}`}
          type="text"
          placeholder={page == "order" || page == "client" ? "Имя" : "Название"}
        />

        {page == "order" && (
          <div
            className={`${cls.Filter__filters__input} ${cls.Filter__filters__select}`}
            onClick={() => {
              setbac(true);
              setOpenSatus(true);
            }}
          >
            Статус заказа
            <DawnIcan />
            {openStatus && (
              <DropDawn
                array={statusOder}
                onClick={() => {
                  setbac(false);
                  setOpenSatus(false);
                }}
                style={{ top: "44px", left: "0px" }}
              />
            )}
          </div>
        )}
        {page == "client" && (
          <input
            className={`${cls.Filter__filters__input} ${cls.Filter__filters__tel}`}
            type="text"
            placeholder={"+998"}
          />
        )}
        {(page == "colorWall" ||
          page == "moreService" ||
          page == "detailService") && (
            <input
              className={`${cls.Filter__filters__input} ${cls.Filter__filters__ark}`}
              type="number"
              placeholder={"Артикул"}
            />
          )}
      </div>

      <div className={cls.Filter__form}>
        {role == "admin" ? <>
        <div
          className={cls.Filter__form__all}
          onClick={() =>
            setSearchParams({
              ...paramsToObject(params.entries()),
              deleteId: "all",
            })
          }
        >
          <Checked fill={"#484038"} />
          <p>Выбрать все</p>
        </div>
        <div className={cls.Filter__form__all} onClick={deleteAll}>
          <DeleteIcon fill={"#484038"} />
          <p>Удалить</p>
        </div>
      </>:""}

        <BlueBtn
          className={`${params.get("openMadal") == "post" ||
            params.get("openMadal") == "put"
            ? cls.Filter__activeBtn
            : ""
            }`}
          onClick={() => {
            if (page == "order") {
              window.open('/', '_blank');

            } else {
              setSearchParams({
                ...paramsToObject(params.entries()),
                openMadal: "post",
              })
            }
          }}
          style={{ gap: "5px", maxWidth: "151px" }}
        >
          <PlusIcon
            fill={
              params.get("openMadal") == "post" ||
                params.get("openMadal") == "put"
                ? "#484038"
                : "white"
            }
          />
          Добавить
        </BlueBtn>

      </div>

      <div
        ref={back}
        onClick={(e) => {
          if (e.target == back.current) {
            setbac(false);
            setOpenSatus(false);
          }
        }}
        className={`${cls.backruond} ${bac ? "displayBlock" : "displayNone"}`}
      ></div>
    </div>
  );
}

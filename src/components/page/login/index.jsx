import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetWindowWidth } from "../../../hooks/useGetWindowWith";
import BlueBtn from "../../ui/button/blue-buttun";
import LoginInput from "../../ui/form/login-input";
import { DoteIcon } from "../../ui/icons";
import cls from "./login.module.scss";
import {  AuthLogin1 } from "../../../services/auth";
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import Loader from "../../ui/loader";
export default function Login() {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const watchedFiles = watch();
  const handleAuth = async (data) => {
    setLoader(true);
    await AuthLogin1(data)
      .then((response) => {
        Cookies.set('authToken', response?.token);
         navigate(`/order?page=1`);
        setLoader(false);
        toast.success("login successfull")
      })
      .catch((error) => {
        
        if (error?.response?.status == "422") {
          setError("phone_number", {
            type: 'manual',
            message: 'Incorrect password or login',
          })
          setError("password", {
            type: 'manual',
            message: 'Incorrect password or login',
          })
          toast.error('Incorrect password or login')
        } else {
          toast.error(error?.response?.data?.message)
        }
        
        setLoader(false);
      });
  };
  return (
    <div className={cls.Login}>
      <div className={cls.Login__content}>
        <div className={cls.Login__content__wrap}>
          <form onSubmit={handleSubmit(handleAuth)}>
            <Link to={'/'}>
            <DoteIcon color={"#484038"} />
            </Link>
            <h1 className={cls.Login__title}>ЭПЗ</h1>
            <p className={cls.Login__text}>
              Электронный прием заказов на алюминиевые фасады
            </p>
            <LoginInput
              type={"text"}
              label={"Логин"}
              placeholder={"Логин"}
              register={{
                ...register("phone_number", { required: "phone_number is required" }),
              }}
              alert={errors.phone_number?.message}
              value={watchedFiles?.phone_number || ""}
              style={{ marginBottom: "20px" }}
            />
            <LoginInput
              type={"password"}
              label={"Пароль"}
              placeholder={"Пароль"}
              register={{
                ...register("password", { required: "password is required" }),
              }}
              alert={errors.password?.message}
              value={watchedFiles?.password || ""}
              style={{ marginBottom: "67px" }}
            />
            <BlueBtn type="submit" style={{ borderRadius: "5px" }}>
              Вход в систему
            </BlueBtn>
          </form>
          <p className={cls.Login__Getter}>
            Сделана в: <br />
            <a href="https://getter.uz/" target="_blank">
              Getter
            </a>
          </p>
        </div>
      </div>
      <img className={cls.Login__img} src="/auth.png" alt="img" />
      {
        loader ? <Loader onClick={()=>setLoader(false)}/>:""
      }
      <Toaster/>
    </div>
  );
}

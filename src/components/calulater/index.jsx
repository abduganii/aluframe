import { useEffect, useRef, useState } from "react";
import cls from "./app.module.scss";
import img from "/Home.svg";
import img1 from "../../assets/Group436.png";
import gif from "../../assets/spinner.mov.gif";

import ReactInputMask from "react-input-mask";

import { LoginIcons, PlusIcons, RoundIcons, XIcons } from "../../components/icons";
import TypeProfile from "../../components/card/type-profile";
import CheckBox from "../../components/form/checkbox";
import WindowCard from "../../components/card/window";
import InputCalt from "../../components/form/input-calt";
import OpenTypeOne from "../../components/card/open-type-one";
import { AddData, GetAllData, GetByIdData } from "../../services/glabal";
import CheckWindow from "../../components/ckeck-window";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import PenTypeCard from "../../components/card/type-pen";
import CheckedIcons from "../../components/checkBox";
import CkeckList from "../../components/check-list";
import CkeckList2 from "../../components/check-list2";
import { AuthLogin } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Loader from "../ui/loader";
function Calculater() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  const watchedFiles = watch();

  const [orderNumber ,setOrederNumber] = useState([1])
  const [orderNumberIndex ,setOrederNumberIndex] = useState(1)
  const [GlobalImage, setGlobalImg] = useState(null)
  const [SizeImage, setSizeImage] = useState(null)
  const [image, setImg] = useState(null)
  const [image2, setImg2] = useState(null)
  const [image3, setImg3] = useState(null)
  const [image4, setImg4] = useState(null)
  const [typeProfileArr, setTypeProfileArr] = useState([])
  const [colerTypeArr, setColerTypeArr] = useState([])
  const [ServiceTypeArr, setServiceTypeArr] = useState([])
  const [windowArr, setWindowArr] = useState([])
  const [openTypeArr, setOpenTypeArr] = useState([])
  const [openTypeNumberArr, setOpenTypeNumberArr] = useState([])
  const [CheckValue, setCheckValue] = useState(true)
  const [CheckValue2, setCheckValue2] = useState(true)
  const [openBottom, setOpenBottom] = useState(true)
  const [openTypeX1, setOpenTypeX1] = useState()
  const [openTypeX2, setOpenTypeX2] = useState()
  const [openTypeY, setOpenY] = useState()
  const [nextResi, setNext] = useState(false)
  const [openClack, setopenClack] = useState(false)
  const [opacityType, setopacityType] = useState(false)
  const [typePositionArr, setTypePositionArr] = useState([])
  const [imageUrlStatic, setimageUrlStatic] = useState(null)
  const [imageUrlHover, setimageUrlHover] = useState(null)
  const [orderChecked, setorderChecked] = useState(false)
  const [errorInput, seterrorInput] = useState(false)
  const [loader, setLoader] = useState(false)
  const [oderDetails, setOderDetails] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [clickChange, setclickChange] = useState(true)

  const elementRefs = useRef();
  const elementRefs1 = useRef();
  const elementRefs2 = useRef();
  const elementRefs3 = useRef();
  const elementRefs4 = useRef();

  const SubmitData = async(data) => {
    setLoader(true)
    await AuthLogin({ name: data.name, phone_number: data.phone_number })
      .then(res => {
        Cookies.set('authToken', res?.token);
        AddData('orders', { user_id: res?.user?.id, orders: data.order })
          .then(response =>  { 
            toast.success("oreder sended")
            GetByIdData("orders/pdf1", response?.data?.data?.id).then(re => {
              navigate('/auth/login')
              window.open(re?.pdf ,"_blank")
             })
          })
      })
      .catch(error => {
        if (error.response.status == 422) {
          toast.error("name and phonenumber is required")
        } else {
          toast.error("failed to create order")
        }
        
      })
      .finally(() => {
        setLoader(false)
    })
  }
  const OrederDetals = async () => {
    
    AddData('order-details', { orders: watchedFiles.order })
      .then(response => { 
        setOderDetails(response?.data?.data)
        setNext(true) 
      })
      .catch(error => {
        toast.error("failed")
      })
      .finally(() => setNext(true))
      AddData('total-price', { orders: watchedFiles.order })
        .then(response => { 
        setTotalPrice(response?.data?.totalPrice)
   
      })
      .catch(error => {
        toast.error("failed")
      })
       
  }
  const OrederPrice = async () => {
    
    AddData('order-price', watchedFiles.order?.[`${orderNumberIndex -1}`] )
      .then(response => { 
        
        setTotalPrice(response?.data?.totalPrice)
       
      })
      .catch(error => {
        toast.error("failed")
      })
  }
  
  useEffect(() => {
    OrederPrice()
  },[orderNumberIndex,watchedFiles.order?.[`${orderNumberIndex -1}`]?.width,watchedFiles.order?.[`${orderNumberIndex -1}`]?.height])

  useEffect(() => {
    const fetchData = async () => {
    const res = await GetAllData('all-profiles');
    const res4 = await GetAllData(`additional-services`);
      setServiceTypeArr(res4?.data)
     
      setValue(`orders[${orderNumberIndex -1}].additional_service_id`, res4?.data?.[0]?.id)
      setValue(`order[${orderNumberIndex -1}].additional_service_id`, res4?.data?.[0]?.id)
      setValue(`orders[${orderNumberIndex -1}].additional_service_url`, res4?.data?.[0]?.image_url)
      setValue(`orders[${orderNumberIndex - 1}].additional_service_description`, res4?.data?.[0]?.description)
      
      setTypeProfileArr(res?.data)
      setValue(`orders[${orderNumberIndex -1}].profile_type_id`, res?.data?.[0]?.id)
      setValue(`order[${orderNumberIndex -1}].profile_type_id`, res?.data?.[0]?.id)
      
      setColerTypeArr(res?.data?.[0]?.profile_colors)
    
      setImg(res?.data?.[0]?.image_url)
      setImg2(res?.data?.[1]?.image_url)
      setImg3(res?.data?.[2]?.image_url)
      setImg4(res?.data?.[3]?.image_url)
      setopenClack(true)
    }
   
    fetchData()
      .then((err) => {
      })
  }, [])

  useEffect(() => {
    if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.window_color_url) { 
      setGlobalImg(watchedFiles.orders?.[`${orderNumberIndex -1}`]?.window_color_url)
    }  else if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_color_url) {
      setGlobalImg(watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_color_url)
    } else {
      setGlobalImg(null)
    }
     
    if (!watchedFiles.orders?.[`${orderNumberIndex -1}`]?.additional_service_id) {
      setValue(`orders[${orderNumberIndex -1}].additional_service_id`, ServiceTypeArr?.[0]?.id)
      setValue(`order[${orderNumberIndex -1}].additional_service_id`, ServiceTypeArr?.[0]?.id)
      setValue(`orders[${orderNumberIndex -1}].additional_service_url`, ServiceTypeArr?.[0]?.image_url)
      setValue(`orders[${orderNumberIndex - 1}].additional_service_description`,ServiceTypeArr?.[0]?.description)
    }
    
    if (watchedFiles.order?.[`${orderNumberIndex -1}`]?.quantity_left ) {
      setValue(`order[${orderNumberIndex -1}].quantity_left`, watchedFiles.order?.[`${orderNumberIndex -1}`]?.quantity_left)
    } else {
      setValue(`order[${orderNumberIndex -1}].quantity_left`, 0)
    }
    if (watchedFiles.order?.[`${orderNumberIndex -1}`]?.quantity_right ) {
      setValue(`order[${orderNumberIndex -1}].quantity_right`, watchedFiles.order?.[`${orderNumberIndex -1}`]?.quantity_right)
    } else {
      setValue(`order[${orderNumberIndex -1}].quantity_right`, 0)
    }
    
    if (!watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_type_id) {
      setValue(`orders[${orderNumberIndex -1}].profile_type_id`,watchedFiles.orders?.[`${orderNumberIndex -2}`]?.profile_type_id)
      setValue(`order[${orderNumberIndex -1}].profile_type_id`,watchedFiles.order?.[`${orderNumberIndex-2}`]?.profile_type_id)
    }
    if (!watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_color_id) {
      setValue(`orders[${orderNumberIndex -1}].profile_color_id`,watchedFiles.orders?.[`${orderNumberIndex -2}`]?.profile_color_id)
      setValue(`order[${orderNumberIndex -1}].profile_color_id`,watchedFiles.order?.[`${orderNumberIndex-2}`]?.profile_color_id)
    }
    
    if (!watchedFiles.orders?.[`${orderNumberIndex -1}`]?.window_color_id) {
      setValue(`orders[${orderNumberIndex -1}].window_color_id`,watchedFiles.orders?.[`${orderNumberIndex -2}`]?.window_color_id)
      setValue(`order[${orderNumberIndex -1}].window_color_id`,watchedFiles.order?.[`${orderNumberIndex-2}`]?.window_color_id)
      setValue(`orders[${orderNumberIndex -1}].window_color_url`,watchedFiles.orders?.[`${orderNumberIndex-2}`]?.window_color_url)
    }
   
    if (!watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_id) {
      setValue(`orders[${orderNumberIndex -1}].opening_type_id`,openTypeArr?.[0]?.id )
      setValue(`order[${orderNumberIndex -1}].opening_type_id`,openTypeArr?.[0]?.id )
    }
    if (!watchedFiles.orders?.[`${orderNumberIndex -1}`]?.handler_position_id) {
      setValue(`orders[${orderNumberIndex -1}].handler_position_id`,typePositionArr?.[0]?.id )
      setValue(`order[${orderNumberIndex -1}].handler_position_id`,typePositionArr?.[0]?.id )
    }
   
   
  },[orderNumberIndex])
  useEffect(() => {
    setOpenTypeArr([])
    const fetchData = async () => {
      const res1 = await GetAllData('types');
      const res = await GetAllData(`opening-types/type/${CheckValue2 ? res1?.data[0]?.id:res1?.data[1]?.id}`);
      setOpenTypeArr(res?.data)
      setValue(`orders[${orderNumberIndex - 1}].handler_position_id`, res?.data?.[0]?.handler_positions?.[0]?.id)
      setValue(`order[${orderNumberIndex - 1}].handler_position_id`, res?.data?.[0]?.handler_positions?.[0]?.id)
      setValue(`orders[${orderNumberIndex - 1}].handler_type_url`,  res?.data?.[0]?.handler_positions?.[0]?.image_url)
      setValue(`orders[${orderNumberIndex -1}].opening_type_id`, res?.data?.[0]?.id)
      setValue(`order[${orderNumberIndex -1}].opening_type_id`, res?.data?.[0]?.id)
      setTypePositionArr(res.data?.[0]?.handler_positions)
      setimageUrlStatic(res?.data?.[0]?.image_url)
    }
    fetchData()
      .then((err) => {
      })
  }, [CheckValue2])
 
  useEffect(() => {
    const fetchData = async () => {
      const res = await GetByIdData(`profile-colors/profile`,watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_type_id);
      setColerTypeArr(res?.data)
      setValue(`orders[${orderNumberIndex -1}].profile_color_id`, res?.data?.[0]?.id)
      setValue(`order[${orderNumberIndex - 1}].profile_color_id`, res?.data?.[0]?.id)
    }
    if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_type_id) {
      fetchData()
      .then((err) => {
      })
    }
  }, [watchedFiles.orders?.[`${orderNumberIndex - 1}`]?.profile_type_id])

  
  useEffect(() => {
    const fetchData = async () => {
      const res = await GetByIdData(`window-colors/profile-color`,watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_color_id);
      setWindowArr(res.data)
      if (!watchedFiles.orders?.[`${orderNumberIndex - 1}`]?.window_color_id) {
        setValue(`orders[${orderNumberIndex -1}].window_color_id`, res.data?.[0]?.id)
        setValue(`order[${orderNumberIndex -1}].window_color_id`, res.data?.[0]?.id)
        setValue(`orders[${orderNumberIndex -1}].window_color_url`, res.data?.[0]?.second_image_url)
      }
    }
    if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_color_id) {
      fetchData()
      .then((err) => {
      })
      OrederPrice()
  }
  }, [watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_color_id,watchedFiles.orders?.[`${orderNumberIndex - 1}`]?.profile_type_id])
    
  useEffect(() => {
    const fetchData = async () => {
      const res = await GetByIdData(`opening-type-numbers/opening-types`, watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_id);
      setOpenTypeNumberArr(res.data?.[0]?.numbers)
     
      if (!watchedFiles.orders?.[`${orderNumberIndex -1}`]?.number_of_loops) {
        setValue(`orders[${orderNumberIndex - 1}].number_of_loops`, res.data?.[0]?.numbers[0]?.id)
        setValue(`order[${orderNumberIndex - 1}].number_of_loops`, res.data?.[0]?.numbers[0]?.number)
      }
      if (watchedFiles.orders?.[`${orderNumberIndex - 1}`]?.opening_type_OpenTrue) {
        setValue(`orders[${orderNumberIndex - 1}].number_of_loops__url`, res.data?.[0]?.numbers[0]?.image_url)
      }
    }
    if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_id) {
      fetchData()
      .then((err) => {
      })
    }
   
  }, [watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_id])
  useEffect(() => {
    const fetchData = async () => {
      const res = await GetByIdData(`opening-type-numbers/opening-types`, watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_id);
      setOpenTypeNumberArr(res.data?.[0]?.numbers)
      // console.log(watchedFiles.order?.[`${orderNumberIndex -1}`]?.number_of_loops)
      if (res.data?.[0]?.numbers) {
        setValue(`orders[${orderNumberIndex - 1}].number_of_loops`, res.data?.[0]?.numbers[0]?.id)
        setValue(`order[${orderNumberIndex - 1}].number_of_loops`, res.data?.[0]?.numbers[0]?.number)
        setValue(`orders[${orderNumberIndex - 1}].number_of_loops__url`, res.data?.[0]?.numbers[0]?.image_url)
      } else {
        setValue(`order[${orderNumberIndex - 1}].number_of_loops`, 1)
      }
      OrederPrice()
    }
    if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_id) {
      fetchData()
      .then((err) => {
      })
  }
   
  }, [clickChange])
  
  const handleScroll = (e) => {
    const rect3 = elementRefs3?.current.getBoundingClientRect();
    const rect = elementRefs?.current.getBoundingClientRect();
    const rect1 = elementRefs1?.current.getBoundingClientRect();
    const rect2 = elementRefs2?.current.getBoundingClientRect();
    const rect4 = elementRefs4?.current.getBoundingClientRect();
   
    if (rect3.top >= 0 & rect3.top <= 400) {
      // console.log(watchedFiles.orders?.[`${orderNumberIndex -1}`]?.window_color_id)
      if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.window_color_url) {
        setGlobalImg(watchedFiles.orders?.[`${orderNumberIndex -1}`]?.window_color_url)
      }  else if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_color_url) {
        setGlobalImg(watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_color_url)
      }else {
        setGlobalImg(null)
      }
    }
  
    if (rect.top >= 200 & rect.top <= 550) {
      setSizeImage(true)
    }else {
      setSizeImage(null)
    }
    if (rect1.top >= 200 & rect1.top <= 600) {
      if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.number_of_loops__url) {
        setGlobalImg(watchedFiles.orders?.[`${orderNumberIndex -1}`]?.number_of_loops__url)
      }  else  if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_url){  
        setGlobalImg(watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_url)
      } else {
         setGlobalImg(imageUrlStatic)
      }
    }
    if (rect2.top >= 200 & rect2.top <= 550) {
      setGlobalImg(img1)
    }
    if (rect4.top >= 400 & rect4.top <= 550) {
      if (watchedFiles.orders?.[`${orderNumberIndex -1}`]?.handler_type_url) {
        setGlobalImg(watchedFiles.orders?.[`${orderNumberIndex -1}`]?.handler_type_url)
      } else {
        setGlobalImg(typePositionArr?.[0]?.image_url)
      }
    }
  };



  return (
    <main className={`${cls.main} ${nextResi ? cls.main__nextResi:""}`}>
      <div className={`${cls.main__Left} ${nextResi ? cls.main__Left__nextResi:""}`}>
        <div className={cls.main__Left__svg}>
          <RoundIcons />
          <Link to={'/auth/login'} className={cls.main__Left__login}>
            <LoginIcons />
            Войте
          </Link>
        </div>
        {
          nextResi ? <div className={cls.main__Left__ckeck}>
            <h3 className={cls.main__Left__title}>Пожалуйста, проверьте ваш заказ перед его оформлением.</h3>
            <p className={cls.main__Left__text}>Вы можете проверить, как идет выполнение вашего заказа, зайдя в свой аккаунт. Логин и пароль для входа в аккаунт будут предоставлены в PDF-файле, а также отправлены на ваш номер.</p>

            <p className={cls.main__Left__disc}>Чек-лист</p>
            {
              oderDetails?.map((e,i) => (
                <div key={i} className={cls.main__Left__ckeck__wrap}>
                  <CkeckList data={e} />
                  <CkeckList2  data={e}/>
                </div>
              ))
           }
           

            <button className={`${cls.main__btn} ${cls.main__btn1} ${cls.main__btnActive} ${!orderChecked ?cls.main__btnopacity:""}`} type={orderChecked? "submit":"button"}>
              {loader ?<img src={gif} width={20} height={20} alt={ "img"} />:""}
              Подтвердить и оформить заказ
            </button>
          </div>
          :
          <>
            {
              SizeImage ? <div className={` ${SizeImage ?cls.main__imgActive__bor:""}`} >
            <div className={cls.main__imgActive__border} style={{ aspectRatio: `${watchedFiles?.order?.[`${orderNumberIndex - 1}`]?.width * 1 ? watchedFiles?.order?.[`${orderNumberIndex - 1}`]?.width * 1: 400}/${watchedFiles?.order?.[`${orderNumberIndex - 1}`]?.height * 1 ? watchedFiles?.order?.[`${orderNumberIndex - 1}`]?.height * 1: 400}`, maxWidth: `${watchedFiles?.order?.[`${orderNumberIndex - 1}`]?.width * 1? watchedFiles?.order?.[`${orderNumberIndex - 1}`]?.width * 1: 400}px` }}></div>
            </div>
            :
            GlobalImage ? <div className={cls.main__imgActive}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          <img   
            src={imageUrlHover ? imageUrlHover: GlobalImage}
            alt="img"
            />
         </div> :

        <div className={`${cls.main__img}  ${openClack && cls.main__imgopen}`}>
                <img
                  className={`${opacityType ? cls.main__imgnohover : ""} ${opacityType == 1 ? cls.main__imghover : ""}`}
                  src={image}
                  alt="imgeds"
                />
                <img
                  className={`${opacityType ? cls.main__imgnohover : ""} ${opacityType == 2 ? cls.main__imghover : ""}`}
                  src={image2}
                  alt="img"
                />
                <img
                  className={`${opacityType ? cls.main__imgnohover : ""} ${opacityType == 3 ? cls.main__imghover : ""}`}
                  src={image3}
                  alt="img"
                />
                <img
                  className={`${opacityType ? cls.main__imgnohover : ""} ${opacityType == 4 ? cls.main__imghover : ""}`}
                  src={image4}
                  alt="img"
                />
        </div>
            }
         </>
              }
        <div className={`${cls.main__bottom} ${openBottom ? cls.main__bottomTrue : ""}`}>
          <div className={cls.main__bottom__open} onClick={() => setOpenBottom(!openBottom)}>
            <div className={`${openBottom ? cls.main__bottom__open__active : ""}`}></div>
          </div>
          <div className={cls.main__bottom__flex}>
            <div className={cls.main__bottom__logo}>
              <p>Сделана в:</p>
              <a href="http://Getter.uz" target="_blank">
                <img src="/Getter.svg" alt="img" width={74} height={30} />
              </a>
            </div>
            <div className={cls.main__bottom__wrap}>
              <div className={cls.main__bottom__content}>
                <h4 className={cls.main__bottom__title}>Стоимость:</h4>
                <p className={cls.main__bottom__text}>
                  Определенное оборудование оплачивается за квадратный метр,
                  другое - за штуку.
                </p>
              </div>
              <div className={cls.main__bottom__line}></div>
              <div className={cls.main__bottom__price}>
                <h4 className={cls.main__bottom__title}>{totalPrice?.toFixed(2)}$</h4>
                {/* <p className={cls.main__bottom__text}>+ 25.08$ Добавили стекло</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(SubmitData)} className={`${cls.main__right} ${ nextResi ?cls.main__right__nextResi:""}`} id="top" onScroll={(e) => handleScroll(e)}>
        <div className={cls.main__right__header} >
          <div className={cls.main__right__header__wrap}>
            <div className={cls.main__right__header__scroll} id="topWrap">
          
            {
              orderNumber?.map(e => (
                <div
                  key={e}
                  className={`${cls.main__right__btn} ${orderNumberIndex== e? cls.main__right__btnActive:""}`}
                  onClick={() => {
                    setOrederNumberIndex(e)
                    seterrorInput(false)
                    const yourDivElement = document.getElementById('top');
                    yourDivElement.scrollTo({
                      top: 10,
                      behavior: 'smooth',
                    });
                  }}
                >
                  {e} заказ
                </div>
              ))
              }
              </div>
           

            <div className={cls.main__right__header__plus} onClick={() => {
              seterrorInput(false)
               if (!watchedFiles.order?.[`${orderNumberIndex -1}`]?.height.length ) {
                    const targetDiv = document.getElementById('inouts'); 
                        if (targetDiv) {
                          targetDiv.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          });
                    }
                    const inputElements = targetDiv.querySelector('input');
                    inputElements.focus()
                    seterrorInput(true)
               } else if (!watchedFiles.order?.[`${orderNumberIndex - 1}`]?.width.length) {
                const targetDiv = document.getElementById('inouts'); 
                        if (targetDiv) {
                          targetDiv.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          });
                    }
                    const inputDiv = document.getElementById('inouts1'); 
                    inputDiv.focus()
                    seterrorInput(true)
              }
               else {
                    setOrederNumber(state => [...state, orderNumber?.[orderNumber.length - 1] + 1])
                    setOrederNumberIndex(orderNumber?.[orderNumber.length - 1] + 1)
                    const yourDivElement = document.getElementById('top');
                   
                    yourDivElement.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }
            }}>
              <PlusIcons />
            </div>
          </div>
        </div>
        {/* <div className={cls.main__right__top}></div> */}
        {
          nextResi ? <div className={cls.main__rgister}>
            <div>
              <h3 className={cls.main__rgister__head} >Контактные данные</h3>
              <p className={cls.main__rgister__dics}>
                На основе этой контактной информации будет создана учетная запись.
              </p>

              <input
                 {...register(`name`)}
                value={watchedFiles?.name || ""}
                className={cls.main__rgister__input}
                type={"text"}
                placeholder={"Имя"} 
                
                />
              <ReactInputMask
                {...register(`phone_number`)}
                value={watchedFiles?.phone_number || ""}
                className={cls.main__rgister__input}
                placeholder={"Телефон"}
                mask="+\9\9\8999999999"
              />
              <label className={cls.main__rgister__label}>
                <CheckedIcons onClick={() => setorderChecked(!orderChecked)} value={orderChecked} />
              <p>Подтверждаю! Весь заказ составлен верно! </p>
              </label>
               {/* { checkedArder && <p className={cls.main__rgister__eror}>>Подтвердите заказ</p>} */}
            </div>
            <button className={`${cls.main__btn} ${cls.main__btn1} ${!orderChecked ?cls.main__btnopacity:""}`}  type={orderChecked? "submit":"button"}>
            {loader ?<img src={gif} width={20} height={20} alt={ "img"} />:""}
              Подтвердить и оформить заказ
            </button>
          </div> :
            <>
              <h2 className={cls.main__right__title}>
                Изготовление рамочных фасадов
              </h2>
              <h3 className={`${cls.main__head} ${cls.main__headTop}`} >Тип профиля</h3>
              {
                typeProfileArr && <div className={cls.main__flex} style={{ gap: "4px" }}>
                  {
                    typeProfileArr?.map((e, i) => (
                      <TypeProfile
                        key={e?.id}
                        title={e?.name}
                        text={e?.text}
                        onMouseEnter={() => setopacityType(i + 1)}
                        onMouseLeave={() => setopacityType(false)}
                        className={`${watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_type_id == e?.id ? "focus" : ""}`}
                        onClick={() => {
                          setValue(`orders[${orderNumberIndex -1}].profile_color_id`, e?.profile_colors?.[0]?.id)
                          setValue(`order[${orderNumberIndex -1}].profile_color_id`, e?.profile_colors?.[0]?.id)
                          setValue(`orders[${orderNumberIndex -1}].profile_color_url`, e?.profile_colors?.[0]?.image_url)
                          setGlobalImg(e?.image_url)
                          setValue(`orders[${orderNumberIndex -1}].profile_type_id`, e?.id)
                          setValue(`order[${orderNumberIndex - 1}].profile_type_id`, e?.id)
                          setValue(`orders[${orderNumberIndex - 1}].window_color_id`, null)
                          OrederPrice()
                        }}
                      />
                    ))
                  }
                </div>
              }
              <h3 className={cls.main__head} >Цвет</h3>
              <div className={cls.main__flex} style={{ gap: "10px" }}>
                {colerTypeArr && colerTypeArr?.map(e => (
                  <div className={`${cls.main__ColorBox} ${watchedFiles.orders?.[`${orderNumberIndex -1}`]?.profile_color_id == e?.id ? "focusImage" : ""}`} style={{ "background": `linear-gradient(${e?.color_from}, ${e?.color_to})` }} key={e?.id} onClick={() => {
                      setGlobalImg(e?.image_url)
                    setValue(`orders[${orderNumberIndex -1}].profile_color_id`, e?.id)
                    setValue(`order[${orderNumberIndex -1}].profile_color_id`, e?.id)
                    setValue(`orders[${orderNumberIndex - 1}].profile_color_url`, e?.image_url)
                    
                    if (e?.window_colors?.length) {
                    setValue(`orders[${orderNumberIndex -1}].window_color_id`, e?.window_colors?.[0]?.id)
                    setValue(`order[${orderNumberIndex -1}].window_color_id`, e?.window_colors?.[0]?.id)
                    setValue(`orders[${orderNumberIndex -1}].window_color_url`, e?.window_colors?.[0]?.second_image_url)
                    } else {
                    setValue(`orders[${orderNumberIndex -1}].window_color_id`, null)
                    setValue(`order[${orderNumberIndex -1}].window_color_id`, null)
                    setValue(`orders[${orderNumberIndex -1}].window_color_url`, null)
                    }
                    OrederPrice()
                 
                  }}></div>

                ))}


              </div>
              <p className={cls.main__dics} style={{ marginTop: "32px" }}>
                <span> Советы!</span> При выборе профиля для фасада рекомендуем учесть стиль, прочность, цвет и размеры.
              </p>

              <h3 className={cls.main__head}  ref={elementRefs3}>Cтекла</h3>
              <CheckBox
                text={"Тип стекла"}
                text2={"Услуги"}
                className={!CheckValue ? cls.mainCheckValueRight : ""}
                // value={CheckValue ? "type" : "service"}
                onClick={() => setCheckValue(!CheckValue)}
              />
              {
                CheckValue ?
                  windowArr &&
                  <div className={` ${cls.main__flexwindow}`} style={{  marginTop: "35px" ,paddingLeft:"10px" }}>
                    {
                      windowArr?.map(e => (
                        <WindowCard
                          key={e?.id}
                          img={e?.image_url}
                          title={e?.name}
                          className={`${watchedFiles.orders?.[`${orderNumberIndex -1}`]?.window_color_id== e?.id ? "focus" : ""}`}
                          onClick={() => {
                            // setWindowId(e)
                            setValue(`orders[${orderNumberIndex -1}].window_color_id`, e?.id)
                            setValue(`order[${orderNumberIndex -1}].window_color_id`, e?.id)
                            setValue(`orders[${orderNumberIndex -1}].window_color_url`, e?.second_image_url)
                            setGlobalImg(e?.second_image_url)
                            OrederPrice()
                          }}
                        />
                      ))
                    }
                  </div> :
                  <div className={cls.main__right__cont} >
                  <div className={cls.main__flex} style={{  marginTop: "35px" ,marginBottom:"30px",paddingLeft:"30px" }}>
                    {
                      ServiceTypeArr && ServiceTypeArr?.map(e => (
                        <CheckWindow
                          style={{ marginBottom: "5px" }}
                          key={e?.id}
                          title={e?.name}
                          // text={e?.text}
                          check={watchedFiles.orders?.[`${orderNumberIndex -1}`]?.additional_service_id == e?.id ? true : false}
                         onClick={() => 
                          {
                           setValue(`orders[${orderNumberIndex -1}].additional_service_id`, e?.id)
                           setValue(`order[${orderNumberIndex -1}].additional_service_id`, e?.id)
                           setValue(`orders[${orderNumberIndex -1}].additional_service_url`, e?.image_url)
                           setValue(`orders[${orderNumberIndex - 1}].additional_service_description`, e?.description)
                           OrederPrice()
                         }
                         }
                        />
                      ))
                      }
                      </div>
                    <div className={cls.main__right__chop}>
                      <img className={cls.main__right__chop__img} src={watchedFiles.orders?.[`${orderNumberIndex -1}`]?.additional_service_url} alt="img" width={192} height={86} />
                    </div>
                    {/* <div className={cls.main__right__messege}>
                      <img src="/Union.png" alt="img" />
                      <p>
                        <span>Советы!</span> {watchedFiles.orders?.[`${orderNumberIndex -1}`]?.additional_service_description}
                      </p>
                    </div> */}
                    <p className={cls.main__dics} style={{ marginTop: "32px" }}>
                    {watchedFiles.orders?.[`${orderNumberIndex -1}`]?.additional_service_description}
                  </p>
                  </div>
              }

              <h3 className={`${cls.main__head} ${cls.main__headTop1}`} ref={elementRefs} >Высота и ширина</h3>
              <div className={cls.main__flex} style={{ gap: "5px", marginBottom: "19px" }} id="inouts">
                <input
                  {...register(`order[${orderNumberIndex - 1}].height`, { required: true })}
                  value={watchedFiles?.order?.[`${orderNumberIndex -1}`]?.height||""}
                  className={cls.main__sizeInput} type="number" placeholder="?-mm" 
                  />
                <input
                id="inouts1"
                  {...register(`order[${orderNumberIndex - 1}].width`, { required: true })}
                  value={watchedFiles?.order?.[`${orderNumberIndex -1}`]?.width||""}
                  className={`${cls.main__sizeInput} ${cls.main__sizeInputImg}`} type="number" placeholder="?-mm"
                />
              </div>
              { errorInput && <p className={cls.main__sizeInput__error}> эти поля являются обязательными</p>}
              <p className={cls.main__dics} style={{ maxWidth: "266px" }}>
                Наши эксперты создадут идеальное решение под ваши требования.
              </p>

              <h3 className={`${cls.main__head} ${cls.main__head2}`} ref={elementRefs1}>Тип открывания</h3>

              <CheckBox
                text={"Петли"}
                text2={"Подемные механизми"}
                style={{ maxWidth: "336px" }}
                className={!CheckValue2 ? cls.mainCheckValueRight : ""}
                onClick={() => {
                  setCheckValue2(!CheckValue2)
                  setValue(`orders[${orderNumberIndex - 1}].opening_type_OpenTrue`, null)
                  OrederPrice()
                  setimageUrlHover(null)
             
                }}
              />
              {
                openTypeArr && <div className={cls.main__flex} style={{ marginTop: "25px", maxWidth: "336px", justifyContent: "space-between", alignItems: "center" }}>
                  {
                    openTypeArr?.map(e => {
                      if (!watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_OpenTrue) return (
                        <PenTypeCard
                          img={e?.image_url}
                          key={e?.id}
                          title={e?.name}
                          className={`${watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_id == e?.id ? "focus" : ""}`}
                          onMouseEnter={() => setimageUrlHover(e?.image_url)}
                          onMouseLeave={()=>setimageUrlHover(null)}
                          onClick={() => {
                            setclickChange(!clickChange)
                            setValue(`orders[${orderNumberIndex -1}].opening_type_id`, e?.id)
                            setValue(`order[${orderNumberIndex -1}].opening_type_id`, e?.id)
                            setValue(`orders[${orderNumberIndex - 1}].opening_type_OpenTrue`, e?.id)
                            setValue(`orders[${orderNumberIndex - 1}].handler_position_id`, e?.handler_positions?.[0]?.id)
                            setValue(`order[${orderNumberIndex - 1}].handler_position_id`, e?.handler_positions?.[0]?.id)
                            setValue(`orders[${orderNumberIndex - 1}].handler_type_url`,  e?.handler_positions?.[0]?.image_url)
                            setValue(`orders[${orderNumberIndex - 1}].opening_type_url`,  e?.image_url)
                            setTypePositionArr(e?.handler_positions)
                            setGlobalImg(e?.image_url)
                            setimageUrlHover(null)
                            OrederPrice()

                          }}
                        />
                      )
                      if (e?.id == watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_OpenTrue) return (
                        <PenTypeCard
                          img={e?.image_url}
                          key={e?.id}
                          title={e?.name}
                     
                          className={`${watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_id == e?.id ? "focus" : ""}`}
                          onClick={() => {
                            setclickChange(!clickChange)
                            setValue(`orders[${orderNumberIndex -1}].opening_type_id`, e?.id)
                            setValue(`order[${orderNumberIndex -1}].opening_type_id`, e?.id)
                            setValue(`orders[${orderNumberIndex -1}].opening_type_OpenTrue`, e?.id)
                            setValue(`orders[${orderNumberIndex - 1}].handler_position_id`, e?.handler_positions?.[0]?.id)
                            setValue(`order[${orderNumberIndex - 1}].handler_position_id`, e?.handler_positions?.[0]?.id)
                            setValue(`orders[${orderNumberIndex - 1}].handler_type_url`, e?.handler_positions?.[0]?.image_url)
                            setGlobalImg(e?.image_url)
                            setTypePositionArr(e?.handler_positions)
                            setimageUrlHover(null)
                            OrederPrice()
                          }}
                        />
                      )
                    }
                    )
                  }
                  {watchedFiles.orders?.[`${orderNumberIndex -1}`]?.opening_type_OpenTrue && <>
                    <div className={cls.main__windowX} onClick={() => setValue(`orders[${orderNumberIndex -1}].opening_type_OpenTrue`,null)}>
                      <p>Другой</p> <XIcons />
                    </div>

                    <OpenTypeOne
                      arr={openTypeNumberArr}
                      value={watchedFiles.orders?.[`${orderNumberIndex -1}`].number_of_loops}
                      setValue={(e) => {
                       
                        setValue(`orders[${orderNumberIndex - 1}].number_of_loops`, e?.id)
                        setValue(`order[${orderNumberIndex - 1}].number_of_loops`, e?.number)
                        setValue(`orders[${orderNumberIndex - 1}].number_of_loops__url`, e?.image_url)
                        setGlobalImg(e?.image_url)
                        OrederPrice()
                      }}
                      
                      openTypeX1={openTypeX1}
                      setOpenTypeX1={setOpenTypeX1}
                      openTypeX2={openTypeX2}
                      setOpenTypeX2={setOpenTypeX2}
                      openTypeY={openTypeY}
                      setOpenY={setOpenY}
                    />
                  </>}


                </div>
              }
              <h3 className={cls.main__head} ref={elementRefs2}>Количество фасадов</h3>

              <InputCalt
                value={watchedFiles.order?.[`${orderNumberIndex - 1}`]?.quantity_left }
              
                 onIncreaze={() =>{
                  parseInt(watchedFiles.order?.[`${orderNumberIndex - 1}`]?.quantity_left) > 0 ?
                    setValue(`order[${orderNumberIndex -1}].quantity_left`, parseInt(watchedFiles.order?.[`${orderNumberIndex - 1}`]?.quantity_left) - 1) :
                     parseInt(watchedFiles.order?.[`${orderNumberIndex - 1}`]?.quantity_left)
                     OrederPrice()
                }}
                onImprove={() => {
                  setValue(`order[${orderNumberIndex - 1}].quantity_left`, parseInt(watchedFiles.order?.[`${orderNumberIndex - 1}`]?.quantity_left) + 1)
                  OrederPrice()
                }}
                label={"Левий"}
                style={{ margin: "0 auto 12px auto" }}
              />
              <InputCalt
                value={watchedFiles.order?.[`${orderNumberIndex - 1}`]?.quantity_right }
             
                onIncreaze={() =>{
                  parseInt(watchedFiles.order?.[`${orderNumberIndex - 1}`]?.quantity_right) > 0 ?
                    setValue(`order[${orderNumberIndex - 1}].quantity_right`, parseInt(watchedFiles.order?.[`${orderNumberIndex - 1}`]?.quantity_right) - 1) :
                    parseInt(watchedFiles.order?.[`${orderNumberIndex - 1}`]?.quantity_right)
                    OrederPrice()
                }}
                onImprove={() => {
                  setValue(`order[${orderNumberIndex - 1}].quantity_right`, parseInt(watchedFiles.order?.[`${orderNumberIndex - 1}`]?.quantity_right) + 1)
                  OrederPrice()
                }}
                label={"Правый"}
                style={{ margin: "auto" }}
              />

              <h3 className={cls.main__head} ref={elementRefs4}>Встроенная или накладная ручка, с какой стороны ее закрепить?</h3>
              {
                typePositionArr && <div className={cls.main__flex} style={{ gap: "4px" }}>
                  {
                    typePositionArr?.map(e => (
                      <TypeProfile
                        key={e?.id}
                        title={e?.name}
                        // text={e?.text}
                        style={{ padding: "21px" }}
                        className={`${watchedFiles.orders?.[`${orderNumberIndex -1}`]?.handler_position_id == e?.id ? "focus" : ""}`}
                        onClick={() => {
                        setValue(`orders[${orderNumberIndex - 1}].handler_position_id`, e?.id)
                        setValue(`order[${orderNumberIndex - 1}].handler_position_id`, e?.id)
                        setValue(`orders[${orderNumberIndex - 1}].handler_type_url`, e?.image_url)
                          setGlobalImg(e?.image_url)
                          OrederPrice()
                        }}
                      />
                    ))
                  }
                </div>
              }
              <h3 className={cls.main__head} >Добавте комментарии</h3>
              <textarea
                style={{ marginBottom: "60px" }}
                className={cls.main__textArea}
                placeholder={"Комментарий"}
                {...register(`order[${orderNumberIndex - 1}].comment`)}
              value={watchedFiles.order?.[`${orderNumberIndex - 1}`]?.comment}
                rows={3}
              ></textarea>

              <button
                className={cls.main__btn}
                type={"button"}
                style={{ marginBottom: "10px", background: "#6d66601a", color: "#6D6660" }}
                onClick={() => {
                  seterrorInput(false)
               if (!watchedFiles.order?.[`${orderNumberIndex -1}`]?.height.length ) {
                    const targetDiv = document.getElementById('inouts'); 
                        if (targetDiv) {
                          targetDiv.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          });
                    }
                    const inputElements = targetDiv.querySelector('input');
                    inputElements.focus()
                    seterrorInput(true)
               }else  if (!watchedFiles.order?.[`${orderNumberIndex - 1}`]?.width.length) {
                const targetDiv = document.getElementById('inouts'); 
                        if (targetDiv) {
                          targetDiv.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          });
                    }
                    const inputDiv = document.getElementById('inouts1'); 
                    inputDiv.focus()
                    seterrorInput(true)
              }
               else {
                    setOrederNumber(state => [...state, orderNumber?.[orderNumber.length - 1] + 1])
                    setOrederNumberIndex(orderNumber?.[orderNumber.length - 1] + 1)
                    const yourDivElement = document.getElementById('top');
                   
                    yourDivElement.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }
                }}
              >Есть ли еще другие размеры</button>
            {/* onClick={()=>setNext(true)} */}
              <button
                className={cls.main__btn}
                type={"button"}
                onClick={() => {
                  const areAllNamesTruthy = watchedFiles?.order?.every(item => item.width);
                  const indexOfFirstFalseWidth = watchedFiles?.order?.findIndex(item => !item.width) + 1;
                  const indexOfFirstFalseHight = watchedFiles?.order?.findIndex(item => !item.height) + 1;
              
                  if (areAllNamesTruthy) {
                  
                    OrederDetals()
                  }
                  if (indexOfFirstFalseHight ) {

                    setOrederNumberIndex(indexOfFirstFalseHight )
                    const targetDiv = document.getElementById('inouts'); 
                      if (targetDiv) {
                        targetDiv.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                      }
                      const inputElements = targetDiv.querySelector('input');
                      inputElements.focus()
                      seterrorInput(true)
                  }else if (indexOfFirstFalseWidth) {

                    setOrederNumberIndex(indexOfFirstFalseWidth )
                    const targetDiv = document.getElementById('inouts'); 
                      if (targetDiv) {
                        targetDiv.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                      }
                      const inputElements = document.getElementById('inouts1');
                      inputElements.focus()
                      seterrorInput(true)
                    }
                }}
              >Далее</button>
            </>
        }
      </form>
      {loader ? <Loader onClick={() => setLoader(false)} /> : ""}
      <Toaster/>

    </main>
  );
}

export default Calculater;
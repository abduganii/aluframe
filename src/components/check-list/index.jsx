import cls from './checkList.module.scss'

export default function CkeckList({ data }) {
    
  return (
    <div className={cls.CkeckList}>
          <div className={cls.CkeckList__list}>
              <p>Профиль:</p>
              <p>{data?.profile_type_name}, {data?.profile_color_name}</p>
          </div>
          <div className={cls.CkeckList__list}>
              <p>Цвет стекла:</p>
              <p>{ data?.window_color_name}</p>
          </div>
          <div className={cls.CkeckList__list}>
              <p>Доп-услуги для стекла:</p>
              <p>{ data?.additional_service_name}</p>
          </div>
          <div className={cls.CkeckList__list}>
              <p>Тип открывания:</p>
              <p>{ data?.opening_type_name}</p>
          </div>
          <div className={cls.CkeckList__list}>
              <p>Количество петель:</p>
              <p>{ data?.number_of_loops}</p>
          </div>
          <div className={cls.CkeckList__list}>
              <p>Высота:</p>
              <p>{ data?.height}</p>
          </div>
          <div className={cls.CkeckList__list}>
              <p>Ширина:</p>
              <p>{data?.width}</p>
          </div>
          <div className={cls.CkeckList__list}>
              <p>Кол-во L:</p>
              <p>{ data?.quantity_left}</p>
          </div>
          <div className={cls.CkeckList__list}>
              <p>Кол-во R:</p>
              <p>{ data?.quantity_right}</p>
          </div>
          <div className={cls.CkeckList__list}>
              <p>Ручка:</p>
              <p>{ data?.window_handler_name}</p>
          </div>
          <div className={cls.CkeckList__list}>
              <p>Присака станд.?:</p>
            {data?.X1 && data?.X2  && data?.Y1  ?  <p>{data?.X1} {data?.X2} { data?.Y1  }</p>:<p>Стандарт</p>}
          </div>
          <div className={cls.CkeckList__list}>
              <p>Комментарий:</p>
              <p>{ data?.comment?.length > 0 ? data?.comment : "Нет комментарий"}</p>
        </div>
    </div>
  )
}

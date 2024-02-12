import cls from './checkList.module.scss'

export default function CkeckList2({ data }) {
    console.log(data)
  return (
    <div className={cls.CkeckList}>
          <h3>Спецификация</h3> 
    
        <div className={`${cls.CkeckList__list} ${cls.CkeckList__list__top}`}>
              <p>товара</p>
              <p>Наименование</p>
              <div>
                  <p>Цена</p>
                  <p>Кол-во</p>
                  <p>Сумма</p>
              </div>
          </div>
          <div className={`${cls.CkeckList__list}`}>
              <p>2109</p>
              <p>{data?.profile_type_name}</p>
              <div>
              <p>{parseFloat(data?.profile_type_price)?.toFixed(2) }$</p>
                  <p>{parseFloat(data?.profile_quantity)?.toFixed(2)}</p>
                  <p>{parseFloat(data?.profile_type_price * data?.profile_quantity).toFixed(2) }$</p>
              </div>
          </div>
          <div className={`${cls.CkeckList__list}`}>
              <p>{ data?.sealant_vendor_code}</p>
              <p>{ data?.sealant_name}</p>
              <div>
                  <p>{ parseFloat(data?.sealant_price)}$</p>
                  <p>{ parseFloat(data?.sealant_quantity) }</p>
                  <p>{ parseFloat(data?.sealant_price * data?.sealant_quantity).toFixed(2)}$</p>
              </div>
          </div>
          
          <div className={`${cls.CkeckList__list}`}>
              <p>{ data?.conrer_vendor_code}</p>
              <p>{ data?.conrer_name}</p>
              <div>
                  <p>{ parseFloat(data?.conrer_price)?.toFixed(2)}$</p>
                  <p>{ parseFloat(data?.conrer_quantity)?.toFixed(2) }</p>
                  <p>{ parseFloat(data?.conrer_price * data?.conrer_quantity)?.toFixed(2)}$</p>
              </div>
          </div>
          <div className={`${cls.CkeckList__list}`}>
              <p>{ data?.window_vendor_code}</p>
              <p>{ data?.window_color_name}</p>
              <div>
                  <p>{ parseFloat(data?.window_color_price)?.toFixed(2)}$</p>
                  <p>{ parseFloat(data?.window_color_surface)?.toFixed(2) }</p>
                  <p>{ parseFloat(data?.window_color_price * data?.window_color_surface)?.toFixed()}$</p>
              </div>
          </div>
          <div className={`${cls.CkeckList__list}`}>
              <p>{ data?.additional_service_vendor_code}</p>
              <p>{ data?.additional_service_name}</p>
              <div>
                  <p>{ parseFloat(data?.additional_service_price)?.toFixed(2)}$</p>
                  <p>{ parseFloat(data?.additional_service_quantity)?.toFixed(2) }</p>
                  <p>{parseFloat( data?.additional_service_price * data?.additional_service_quantity)?.toFixed(2)}$</p>
              </div>
          </div>
          <div className={`${cls.CkeckList__list}`}>
              <p>{ data?.assembly_service_vendor_code}</p>
              <p>{ data?.assembly_service_name}</p>
              <div>
                  <p>{ parseFloat(data?.assembly_service_price)?.toFixed(2)}$</p>
                  <p>{ parseFloat(data?.assembly_service_quantity)?.toFixed(2) }</p>
                  <p>{ parseFloat(data?.assembly_service_price * data?.assembly_service_quantity)?.toFixed(2)}$</p>
              </div>
          </div>
          
          <div className={`${cls.CkeckList__list}`}>
              <p>{ data?.window_handler_vendor_code}</p>
              <p>{ data?.window_handler_name}</p>
              <div>
                  <p>{ parseFloat(data?.window_handler_price)?.toFixed(2)}$</p>
                  <p>{ parseFloat(data?.window_handler_quantity)?.toFixed(2) }</p>
                  <p>{ parseFloat(data?.window_handler_price * data?.window_handler_quantity)?.toFixed(2)}$</p>
              </div>
          </div>
    </div>
  )
}

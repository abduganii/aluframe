
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import paramsToObject from "../../../hooks/paramsToObject";
import { GetAllData, GetByIdData, UpdateData } from "../../../services/glabal";
import Filter from "../../ui/filter";
import ListItem from "../../ui/item-list";
import DeleteModal from "../../ui/modal/delete-modal";
import Pagination from "../../ui/pagination";
import TopList from "../../ui/top-list";
import toast, { Toaster } from 'react-hot-toast';
export default function OrderPage({role}) {
  const [params, setSearchParams] = useSearchParams()
  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['orders', params.get('page')],
    async () => await GetAllData("orders", {
      page: params.get('page') || '',
    }) || {},
  )
  const { data:statuses } = useInfiniteQuery(
    ['statuses' ],
    async () => await GetAllData("statuses") || {},
  )
  
  const totalPages =  Math.ceil(data?.pages?.[0]?.meta?.total / 10) || 1
  const dataArr = data?.pages?.reduce((acc, page) => [...acc, ... data?.pages?.[0]?.data?.orders], []) || []
 
 
  const queryClient = useQueryClient()
  const updateStatus = async (data,onedataId) => {
    await UpdateData("orders", data, onedataId)
    .then((response) => {
      queryClient.invalidateQueries(["orders"])
    
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
    });
  }
  const PdfShow =  async (url,id) => {
    const data = await GetByIdData(url, id)
    if (data?.pdf) {
     
       window.open(data?.pdf ,"_blank")
    } else {
      
   }
    } 
  return (
    <>
      <div>
        <Filter page={"order"} role={role} />
        <div className="scrollList">
          <TopList
            array={[
              "ID",
              "Дата",
              "Клиент",
              "Тел.номер",
              "Профиль",
              "Cтекла",
              "Доп. услуги",
              "Сумма",
              "Статус заказа",
              "Действия",
            ]}
          />
          {dataArr && dataArr?.map(e => (
            <ListItem
              key={e?.id}
              id={e?.id}
              time={e?.client_phone_number || '-'}
              name={e?.client_name || '-'}
              tel={e?.client_phone_number || '-'}
              details={[`${e?.order_details?.map(e => e.profile_type)}`, `${e?.order_details?.map(e => e.window_color)}`, `${e?.order_details?.map(e => e.additional_service)}`]}
              price={e?.total_price ?e?.total_price +"$" : "-"}
              status={e?.status ? e?.status : "В ожидании"}
              statusColor={e?.status_color}
              statusArr={statuses?.pages?.[0]?.data||[]}
              role={role}
              pdf1={async () =>PdfShow("orders/pdf1",e?.id)}
              pdf2={role == "superadmin"||role == "admin" ? async () =>PdfShow("orders/pdf2",e?.id):null}
              pdf3={role == "superadmin"||role == "admin" ?()=> PdfShow("orders/pdf3",e?.id) :null}
              pdf4={role == "superadmin"||role == "admin" ? ()=>  PdfShow("orders/pdf4",e?.id):null}
              remove={role=="superadmin"||role == "admin" ? () =>
                setSearchParams({
                  ...paramsToObject(params.entries()),
                  deleteId: e?.id,
                })

              :null}
              statusChange={role == "admin" || role == "superadmin" ? (id) => {
                
                updateStatus({status:id},e?.id)
              } : null
                
              }
          />
          ))}
          <DeleteModal url={"orders"} /> 
      
        </div>
      </div>
      <Pagination totalPages={totalPages} />
      <Toaster/>
    </>
  );
}

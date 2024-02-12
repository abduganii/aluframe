import { useForm } from "react-hook-form";
import Filter from "../../ui/filter";
import AddInput from "../../ui/form/add-input";
import GlobalForm from "../../ui/form/global-form";
import UploadInput from "../../ui/form/upload-input";
import ListItem from "../../ui/item-list";
import Pagination from "../../ui/pagination";
import TopList from "../../ui/top-list";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { GetAllData } from "../../../services/glabal";
import DeleteModal from "../../ui/modal/delete-modal";
import { FileUpload } from "../../../services/file-uplaod";
import paramsToObject from "../../../hooks/paramsToObject";
import UploadInputCount from "../../ui/form/upload-count-input";
import { UploadLitelIcon } from "../../ui/icons";

const arr = [
  { id: "Петля", name: "Петля" },
  { id: " Подёмный механизм", name: " Подёмный механизм" },
];
export default function NumberTypePage() {
  const [onedataId, setonedataId] = useState(false)
  const [params, setSearchParams] = useSearchParams()
  const { data: OpenForType } = useInfiniteQuery(
    ['opening-types'],
    async () => await GetAllData("opening-types") || {},
  )
  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['opening-type-numbers', params.get('page')],
    async () => await GetAllData("opening-type-numbers", {
      page: params.get('page') || '',
    }) || {},
  )


  const openingTypes = data?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  const totalPages = Math.ceil(data?.pages?.[0]?.meta?.total / 10) || 1
  const profilesTypeType = OpenForType?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const watchedFiles = watch();
 
  const [count, setCount] = useState([]);
  
  useEffect(() => {
    setValue("numbers",count)
  }, [count])
 

  return (
    <>
      <div>
        <Filter page={"opneType"} />
        <div className="scrollList">
          <TopList
            array={[
              "Название",
              "Кол-во выбора",
              "Действия",
            ]}
          />
          <GlobalForm handleSubmit={handleSubmit} reset={reset} setfile={setCount}  url={'opening-type-numbers'} onedataId={onedataId}>

            <AddInput
              type={"select"}
              arr={profilesTypeType}
              onChange={(e) => setValue("opening_type_id", e)}
              placeholder={"Тип"}
              value={watchedFiles?.opening_type_id || "Выберите тип "}
            />

            <div className="flexCount">
              {
                count && count?.map(e => (
                  <div className={"UploadInputCount__input"} onClick={()=>setOpenMada(true)}>
                  <div>
                      <UploadLitelIcon/>
                    </div>
                    {e?.number}
                </div>
      
                ))
             }
              <UploadInputCount
             
                setCount={setCount}
               
              />
           </div>
            
          </GlobalForm>

          {
            openingTypes && openingTypes?.map(e => <ListItem
         
              key={e?.id} 
              name={e?.opening_type_name}
              countType={e?.numbers}
              remove={() =>
                setSearchParams({
                  ...paramsToObject(params.entries()),
                  deleteId: e?.id,
                })

              }
              update={() => {
                setonedataId(e?.id)
                setSearchParams({
                  ...paramsToObject(params.entries()),
                  openMadal: "put",
                })
                
                setCount(e?.numbers)
                setValue("opening_type_id", e?.opening_type_id)
             

              }}
            />)}
          <DeleteModal url={"opening-type-numbers"} />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}

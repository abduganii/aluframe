import { useState } from "react";
import { useForm } from "react-hook-form";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import paramsToObject from "../../../hooks/paramsToObject";
import { GetAllData } from "../../../services/glabal";
import Filter from "../../ui/filter";
import AddInput from "../../ui/form/add-input";
import GlobalForm from "../../ui/form/global-form";
import ListItem from "../../ui/item-list";
import DeleteModal from "../../ui/modal/delete-modal";
import Pagination from "../../ui/pagination";
import TopList from "../../ui/top-list";

export default function DetailsServicePage() {
  const [onedataId, setonedataId] = useState(false)
  const [params, setSearchParams] = useSearchParams()
  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['assembly-services', params.get('page')],
    async () => await GetAllData("assembly-services", {
      page: params.get('page') || '',
    }) || {},
  )

  const assembleServices = data?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  const totalPages = Math.ceil(data?.pages?.[0]?.meta?.total / 10) || 1
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
  return (
    <>
      <div>
        <Filter page={"detailService"} />
        <div className="scrollList">
          <TopList
            array={[
              "Название",
              "Артикул",
              "Оператор условия",
              "Высота фасада",
              "Цена",
              "Действия",
            ]}
          />
          <GlobalForm handleSubmit={handleSubmit} reset={reset} url={'assembly-services'} onedataId={onedataId}>
            <AddInput
              type={"text"}
              placeholder={"Название"}
              register={{
                ...register("name", { required: "name" }),
              }}
              alert={errors.name?.message}
              value={watchedFiles?.name || ""}
            />
            <AddInput
              type={"text"}
              placeholder={"Артикул"}
              register={{
                ...register("vendor_code", { required: "vendor_code" }),
              }}
              alert={errors.vendor_code?.message}
              value={watchedFiles?.vendor_code || ""}
            />
            <AddInput
              type={"text"}
              placeholder={"Оператор условия"}
              register={{
                ...register("condition_operator", { required: "condition_operator" }),
              }}
              alert={errors.condition_operator?.message}
              value={watchedFiles?.condition_operator || ""}
            />
            <AddInput
              type={"text"}
              placeholder={"Высота фасада"}
              register={{
                ...register("facade_height", { required: "facade_height" }),
              }}
              alert={errors.facade_height?.message}
              value={watchedFiles?.facade_height || ""}
            />
            <AddInput
              type={"number"}
              placeholder={"Цена"}
              register={{
                ...register("price", { required: "price" }),
              }}
              alert={errors.price?.message}
              value={watchedFiles?.price || ""}
            />
          </GlobalForm>
          {
            assembleServices && assembleServices?.map(e => <ListItem

              key={e?.id}
              details={[
                `${e?.name}`,
                `${e?.vendor_code}`,
                `${e?.condition_operator}`,
                `${e?.facade_height}`,
                `${e?.price}`,
              ]}
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
                setValue('name', e?.name)
                setValue('vendor_code', e?.vendor_code)
                setValue('condition_operator', e?.condition_operator)
                setValue('facade_height', e?.facade_height)
                setValue('price', e?.price)
              }}
            />)}
          <DeleteModal url={"assembly-services"} />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}

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

export default function UgilPage() {
  const [onedataId, setonedataId] = useState(false)
  const [params, setSearchParams] = useSearchParams()
  const { data: profiles } = useInfiniteQuery(
    ['profiles'],
    async () => await GetAllData("profiles") || {},
  )
  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['corners', params.get('page')],
    async () => await GetAllData("corners", {
      page: params.get('page') || '',
    }) || {},
  )

  const profilesArr = profiles?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
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
  const arr = [
    { id: "Standartniy Profil", name: "Standartniy Profil" },
    { id: " Profil", name: " Profil" },
    { id: "Standartniy ", name: "Standartniy " },
  ];
  return (
    <>
      <div>
        <Filter page={"cantrol"} />
        <div className="scrollList">
          <TopList
            array={[
              "Наименование",
              "Код товара",
              "Тип профиль",
              "Цена (за 1 метр)",
              "Действия",
            ]}
          />
          <GlobalForm handleSubmit={handleSubmit} reset={reset} url={'corners'} onedataId={onedataId}>
            <AddInput
              type={"text"}
              placeholder={"Наименование"}
              register={{
                ...register("name", { required: "name" }),
              }}
              alert={errors.name?.message}
              value={watchedFiles?.name || ""}
            />
            <AddInput
              type={"text"}
              placeholder={"Код товара"}
              register={{
                ...register("vendor_code", { required: "vendor_code" }),
              }}
              alert={errors.vendor_code?.message}
              value={watchedFiles?.vendor_code || ""}
            />

            <AddInput
              type={"select"}
              arr={profilesArr}
              onChange={(e) => setValue("profile_type_id", e)}
              placeholder={"Выберите тип расчета"}
              value={watchedFiles?.profile_type_id || "Выберите тип расчета"}
            />
            <AddInput
              type={"number"}
              placeholder={"0.0"}
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
                `${e?.profile_type_name}`,
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
                setValue('profile_type_id', e?.profile_type_id)
                setValue('price', e?.price)
              }}
            />)}
          <DeleteModal url={"corners"} />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}

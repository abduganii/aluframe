import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import paramsToObject from "../../../hooks/paramsToObject";
import { FileUpload } from "../../../services/file-uplaod";
import { GetAllData } from "../../../services/glabal";
import Filter from "../../ui/filter";
import AddInput from "../../ui/form/add-input";
import GlobalForm from "../../ui/form/global-form";
import UploadInput from "../../ui/form/upload-input";
import ListItem from "../../ui/item-list";
import DeleteModal from "../../ui/modal/delete-modal";
import Pagination from "../../ui/pagination";
import TopList from "../../ui/top-list";

export default function TypeProfilePage() {
  const [onedataId, setonedataId] = useState(false)
  const [params, setSearchParams] = useSearchParams()
  const { data: profilesType } = useInfiniteQuery(
    ['calculationTypes'],
    async () => await GetAllData("calculation-types") || {},
  )
  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['profiles', params.get('page')],
    async () => await GetAllData("profiles", {
      page: params.get('page') || '',
    }) || {},
  )


  const profiles = data?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  const totalPages = Math.ceil(data?.pages?.[0]?.meta?.total / 10) || 1
  const profilesTypeType = profilesType?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const watchedFiles = watch();
  const [file, setfile] = useState();

  const hendleimg = async (e) => {
    if (e.target.files[0]) {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      const data = await FileUpload(formData)
      setfile(URL.createObjectURL(e.target.files[0]));
      setValue("image_url", data?.data?.image_url)
      setValue("image_name", data?.data?.image_name)
    }

  };
  return (
    <>
      <div>
        <Filter page={"typeprofile"} />
        <div className="scrollList">
          <TopList
            array={[
              "Фото",
              "Название",
              "Тип расчета",
              "Цена",
              "Индекс сортировки",
              "Действия",
            ]}
          />
          <GlobalForm handleSubmit={handleSubmit} setfile={setfile} reset={reset} url={'profiles'} onedataId={onedataId}>
            <UploadInput
              onChange={(e) => hendleimg(e)}
              type={"text"}
              placeholder={"Название"}
              value={file}
              setValue={setValue}

            />
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
              type={"select"}
              arr={profilesTypeType}
              onChange={(e) => setValue("calculation_type_id", e)}
              placeholder={"Выберите тип расчета"}
              value={watchedFiles?.calculation_type_id || "Выберите тип расчета"}
            />
            <AddInput
              type={"number"}
              placeholder={"price"}
              register={{
                ...register("price", { required: "price" }),
              }}
              alert={errors.price?.message}
              value={watchedFiles?.price || ""}
            />
            <AddInput
              type={"number"}
              placeholder={"count"}
              register={{
                ...register("sort_index", { required: "sort_index" }),
              }}
              alert={errors.sort_index?.message}
              value={watchedFiles?.sort_index || ""}
            />
          </GlobalForm>
          {
            profiles && profiles?.map(e => <ListItem
              key={e?.id}
              img={e?.image_url}
              details={[
                `${e?.name}`,
                `${e?.calculation_type_name}`,
                `${e?.price}`,
                `${e?.sort_index}`,
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
                setfile(e?.image_url)
                setValue('name', e?.name)
                setValue('image_url', e?.image_url)
                setValue('image_name', e?.image_name)
                setValue('calculation_type_id', e?.calculation_type_id)
                setValue('price', e?.price)
                setValue('sort_index', e?.sort_index)
              }}
            />)}
          <DeleteModal url={"profiles"} />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}



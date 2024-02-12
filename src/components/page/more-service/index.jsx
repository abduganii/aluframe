import { useForm } from "react-hook-form";
import Filter from "../../ui/filter";
import AddInput from "../../ui/form/add-input";
import GlobalForm from "../../ui/form/global-form";
import UploadInput from "../../ui/form/upload-input";
import ListItem from "../../ui/item-list";
import Pagination from "../../ui/pagination";
import TopList from "../../ui/top-list";
import { useState } from "react";
import { FileUpload } from "../../../services/file-uplaod";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { GetAllData } from "../../../services/glabal";
import paramsToObject from "../../../hooks/paramsToObject";
import DeleteModal from "../../ui/modal/delete-modal";

export default function MoreServicePage() {
  const [onedataId, setonedataId] = useState(false)
  const [params, setSearchParams] = useSearchParams()
  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['additional-services', params.get('page')],
    async () => await GetAllData("additional-services", {
      page: params.get('page') || '',
    }) || {},
  )

  const additionalServices = data?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
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
        <Filter page={"moreService"} />
        <div className="scrollList">
          <TopList
            array={[
              "Фото",
              "Название",
              "Артикул",
              "description",
              "Цена",
              "Индекс сортировки",
              "Действия",
            ]}
          />
          <GlobalForm handleSubmit={handleSubmit} setfile={setfile} reset={reset} url={'additional-services'} onedataId={onedataId}>
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
              placeholder={"description"}
              register={{
                ...register("description", { required: "description" }),
              }}
              alert={errors.description?.message}
              value={watchedFiles?.description || ""}
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
            <AddInput
              type={"number"}
              placeholder={"Индекс сортировки"}
              register={{
                ...register("sort_index", { required: "sort_index" }),
              }}
              alert={errors.sort_index?.message}
              value={watchedFiles?.sort_index || ""}
            />
          </GlobalForm>

          {
            additionalServices && additionalServices?.map(e => <ListItem
              img={e?.image_url}
              key={e?.id}
              details={[
                `${e?.name}`,
                `${e?.vendor_code}`,
                `${e?.description}`,
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
                setValue('vendor_code', e?.vendor_code)
                setValue('description', e?.description)
                setValue('price', e?.price)
                setValue('sort_index', e?.sort_index)
              }}
            />)}
          <DeleteModal url={"additional-services"} />

        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}

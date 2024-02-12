import { useState } from "react";
import { useForm } from "react-hook-form";
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

export default function PenPosition() {
  const [onedataId, setonedataId] = useState(false)
  const [params, setSearchParams] = useSearchParams()

  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['handler-positions', params.get('page')],
    async () => await GetAllData("handler-positions", {
      page: params.get('page') || '',
    }) || {},
  )


  const PositionServices = data?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []

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
        <Filter page={"cantrol"} />
        <div className="scrollList">
          <TopList
            array={[
              "Фото",
              "Наименование",
                "Индекс сортировки",
              "Действия",
            ]}
          />
          <GlobalForm handleSubmit={handleSubmit} setfile={setfile} reset={reset} url={'handler-positions'} onedataId={onedataId}>
            <UploadInput
              onChange={(e) => hendleimg(e)}
              type={"text"}
              placeholder={"Название"}
              value={file}
              setValue={setValue}

            />
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
            PositionServices && PositionServices?.map(e => <ListItem

              key={e?.id}
              img={e?.image_url}
              details={[
                `${e?.name}`,
                `${e?.sort_index}`,
              ]}
              remove={() =>
                setSearchParams({
                  ...paramsToObject(params.entries()),
                  deleteId: e?.id,
                })

              }
              update={() => {
                setfile( e?.image_url)
                setonedataId(e?.id)
                setSearchParams({
                  ...paramsToObject(params.entries()),
                  openMadal: "put",
                })
                setValue('name', e?.name)
                setValue('image_url', e?.image_url)
                setValue('image_name', e?.image_name)
                
                setValue('sort_index', e?.sort_index)
              }}
            />)}
          <DeleteModal url={"handler-positions"} />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}

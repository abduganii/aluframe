import { useForm } from "react-hook-form";
import Filter from "../../ui/filter";
import AddInput from "../../ui/form/add-input";
import GlobalForm from "../../ui/form/global-form";
import UploadInput from "../../ui/form/upload-input";
import ListItem from "../../ui/item-list";
import Pagination from "../../ui/pagination";
import TopList from "../../ui/top-list";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { GetAllData } from "../../../services/glabal";
import DeleteModal from "../../ui/modal/delete-modal";
import { FileUpload } from "../../../services/file-uplaod";
import paramsToObject from "../../../hooks/paramsToObject";

const arr = [
  { id: "Петля", name: "Петля" },
  { id: " Подёмный механизм", name: " Подёмный механизм" },
];
export default function OpenTypePage() {
  const [onedataId, setonedataId] = useState(false)
  const [params, setSearchParams] = useSearchParams()
  const { data: PositionPen } = useInfiniteQuery(
    ['handler-positions'],
    async () => await GetAllData("handler-positions") || {},
  )
  const { data: OpenForType } = useInfiniteQuery(
    ['types'],
    async () => await GetAllData("types") || {},
  )
  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['opening-types', params.get('page')],
    async () => await GetAllData("opening-types", {
      page: params.get('page') || '',
      per_page:8
    }) || {},
  )

  const openingTypes = data?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  const PositionPenArr = PositionPen?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  const totalPages = Math.ceil(data?.pages?.[0]?.meta?.total / 8) || 1
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
        <Filter page={"opneType"} />
        <div className="scrollList">
          <TopList
            array={[
              "Фото",
              "Положение ручки",
              "Название",
              "Тип",
              "Индекс сортировки",
              "Действия",
            ]}
          />
          <GlobalForm handleSubmit={handleSubmit}  reset={reset} setfile={setfile} url={'opening-types'} onedataId={onedataId}>
            <UploadInput
              onChange={(e) => hendleimg(e)}
              type={"text"}
              placeholder={"Название"}
              value={file}
            />
            <AddInput
              type={"selectTag"}
              arr={PositionPenArr}
              onChange={(e) => {
                console.log(e)
                setValue("handler_positions", e)
              }}
              placeholder={"Выберите Положение ручки"}
              value={watchedFiles?.handler_positions || []}
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
              onChange={(e) => setValue("type_id", e)}
              placeholder={"Тип"}
              value={watchedFiles?.type_id || "Выберите тип "}
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
            openingTypes && openingTypes?.map(e => <ListItem
              img={e?.image_url}
              key={e?.id}
              PositionPen={e?.handler_positions}
              details={[
                `${e?.name}`,
                `${e?.type_name}`,
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
                setValue('type_id', e?.type_id)

                setValue('handler_positions', e?.handler_positions?.map(item => item.id))
                setValue('type_name', e?.type_name)

                setValue('sort_index', e?.sort_index)

              }}
            />)}
          <DeleteModal url={"opening-types"} />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}

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

export default function ColerProfilePage() {
  const [onedataId, setonedataId] = useState(false)
  const [params, setSearchParams] = useSearchParams()
  const { data: profilesType } = useInfiniteQuery(
    ['profiles'],
    async () => await GetAllData("profiles") || {},
  )

  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['profile-colors', params.get('page')],
    async () => await GetAllData("profile-colors", {
      page: params.get('page') || '',
    }) || {},
  )

  const profileColors = data?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  const profileType = profilesType?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  const totalPages = Math.ceil(data?.pages?.[0]?.meta?.total / 10) || 1

  console.log(profileColors)
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
        <Filter page={"coler"} />
        <div className="scrollList">
          <TopList
            array={[
              "Фото",
              "Название",
              "Тип профили",
              "Индекс сортировки",
              "Hex code (from)",
              "to",
              "Действия",
            ]}
          />
          <GlobalForm handleSubmit={handleSubmit}  setfile={setfile} reset={reset} url={'profile-colors'} onedataId={onedataId}>
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
              arr={profileType}
              onChange={(e) => setValue("profile_type_id", e)}
              placeholder={"Выберите Тип профили"}
              value={watchedFiles?.profile_type_id || "Выберите Тип профили"}
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
            <AddInput
              type={"text"}
              placeholder={"#"}
              register={{
                ...register("color_from", { required: "color_from" }),
              }}
              alert={errors.color_from?.message}
              value={watchedFiles?.color_from || ""}
            />
            <AddInput
              type={"text"}
              placeholder={"#"}
              register={{
                ...register("color_to", { required: "color_to" }),
              }}
              alert={errors.color_to?.message}
              value={watchedFiles?.color_to || ""}
            />
          </GlobalForm>
          {
            profileColors && profileColors?.map(e =>
              <ListItem key={e?.id}
                img={e?.image_url}
                details={
                  [`${e?.name}`,
                   ` ${e?.profile_type_name}`,
                  `${e?.sort_index}`,
                  `${e?.color_from}`,
                  `${e?.color_to}`,]}
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
                  setValue('profile_type_id', e?.profile_type_id)
                  setValue('image_url', e?.image_url)
                  setValue('image_name', e?.image_name)
                  setValue('sort_index', e?.sort_index)
                  setValue('color_from', e?.color_from)
                  setValue('color_to', e?.color_to)
                }}
              />)}
          <DeleteModal url={"profile-colors"} />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}

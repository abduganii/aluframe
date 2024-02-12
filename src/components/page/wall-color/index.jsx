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
import paramsToObject from "../../../hooks/paramsToObject";
import DeleteModal from "../../ui/modal/delete-modal";
import { GetAllData } from "../../../services/glabal";

export default function WallColerPage() {
  const [file, setfile] = useState();
  const [file1, setfile1] = useState();
  const [onedataId, setonedataId] = useState(false)
  const [params, setSearchParams] = useSearchParams()
  const { data: profilesColor } = useInfiniteQuery(
    ['profiles'],
    async () => await GetAllData("profiles") || {},
  )
  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['window-colors', params.get('page')],
    async () => await GetAllData("window-colors", {
      page: params.get('page') || '',
      per_page:8
    }) || {},
  )

  const windowColors = data?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  const ProfileColors = profilesColor?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  
  const totalPages = Math.ceil(data?.pages?.[0]?.meta?.total / 8) || 1

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
  const [profileId,setProfileId] = useState([])
  const [profileIdor,setProfileIdor] = useState()
  
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
  const hendleimg1 = async (e) => {
    if (e.target.files[0]) {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      const data = await FileUpload(formData)
      setfile1(URL.createObjectURL(e.target.files[0]));
      setValue("second_image_url", data?.data?.image_url)
      setValue("second_image_name", data?.data?.image_name)

    }
  };

 

  return (
    <>
      <div>
        <Filter page={"colorWall"} />
        <div className="scrollList">
          <TopList
            array={[
              "Фото",
              "Фото2",
              "Название",
              "Тип профили",
              "Цвета профиля",
              "Артикул",
              "Цена",
              "Индекс сортировки",
              "Действия",
            ]}
          />
          <GlobalForm handleSubmit={handleSubmit} setfile={setfile} setfile1={setfile1} reset={reset} url={'window-colors'} onedataId={onedataId}>
            <UploadInput
              onChange={(e) => hendleimg(e)}
              type={"text"}
              placeholder={"Название"}
              value={file}
            />
            <UploadInput
              onChange={(e) => hendleimg1(e)}
              type={"text"}
              placeholder={"Название"}
              value={file1}
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
              arr={ProfileColors}
              value={profileIdor}
              onChange={(e) => {
                setProfileIdor(e)
                ProfileColors.forEach(el => {
                  if (el?.id == e) {
                    setProfileId(el?.profile_colors)
                 }
                })
              }}
              placeholder={"Выберите Тип профили"}
              
            />
              <AddInput
              type={"select"}
              arr={profileId}
              onChange={(e) => setValue("profile_color_id", e)}
              placeholder={"Выберите Цвета профиля"}
              value={watchedFiles?.profile_color_id || "Выберите Цвета профиля"}
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
            windowColors && windowColors?.map(e => <ListItem
              img={e?.image_url}
              img2={e?.second_image_url}
              key={e?.id}
              details={[
                `${e?.name}`,
                `${e?.profile_type_name}`,
                `${e?.profile_color_name}`,
                `${e?.vendor_code}`,
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
                setfile1(e?.second_image_url)
                setValue('name', e?.name)
                setValue('vendor_code', e?.vendor_code)
                setValue('price', e?.price)
                setValue('sort_index', e?.sort_index)
                setValue('profile_color_id', e?.profile_color_id)
                setValue('image_url', e?.image_url)
                setProfileIdor(e?.profile_type_id)
             
                setValue('image_name', e?.image_name)
                setValue('second_image_url', e?.second_image_url)
                setValue('second_image_name', e?.second_image_name)
              }}
            />)}
          <DeleteModal url={"window-colors"} />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}

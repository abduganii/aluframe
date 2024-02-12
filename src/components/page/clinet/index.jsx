import { useInView } from 'react-intersection-observer'
import { useForm } from "react-hook-form";
import Filter from "../../ui/filter";
import ListItem from "../../ui/item-list";
import Pagination from "../../ui/pagination";
import TopList from "../../ui/top-list";
import GlobalForm from "../../ui/form/global-form";
import AddInput from "../../ui/form/add-input";
import AddMaskInput from "../../ui/form/add-mask-input";
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { DeleteData, GetAllData } from '../../../services/glabal';
import paramsToObject from '../../../hooks/paramsToObject';
import DeleteModal from '../../ui/modal/delete-modal';
export default function ClientPage() {
  const [onedataId, setonedataId] = useState(false)
  const [params, setSearchParams] = useSearchParams()
  const { data, isLoading: isNewsLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['clients', params.get('page')],
    async () => await GetAllData("clients", {
      page: params.get('page') || '',
    }) || {},
  )

  const client = data?.pages?.reduce((acc, page) => [...acc, ...page?.data], []) || []
  const totalPages = Math.ceil(data?.pages?.[0]?.meta?.total / 10) || 1

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

  return (
    <>
      <div>
        <Filter page={"client"} />
        <div className="scrollList">
          <TopList array={["Клиент", "Тел.номер", "Действия"]} />
          <GlobalForm handleSubmit={handleSubmit} onedataId={onedataId} reset={reset} url={'clients'} >
            <AddInput
              type={"text"}
              placeholder={"Клиент"}
              register={{
                ...register("name", { required: "name" }),
              }}
              alert={errors.name?.message}
              value={watchedFiles?.name || ""}
            />
            <AddMaskInput
              placeholder={"Тел.номер"}
              mask="+\9\9\8999999999"
              register={{
                ...register("phone_number", { required: "phone_number" }),
              }}
              alert={errors.phone_number?.message}
              value={watchedFiles?.phone_number || ""}
            />
          </GlobalForm>

          {
            client && client?.map(e => (

              <ListItem
                key={e?.id}
                name={e?.name}
                tel={e?.phone_number}
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
                  setValue('phone_number', e?.phone_number)
                }}

              />
            ))
          }
          <DeleteModal url={"clients"} />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}

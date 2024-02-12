import cls from "./globalForm.module.scss";
import BlueBtn from "../../button/blue-buttun";
import CancelBtn from "../../button/cancel-btn";
import { useSearchParams } from "react-router-dom";
import paramsToObject from "../../../../hooks/paramsToObject";
import { AddData, UpdateData } from "../../../../services/glabal";
import { useQueryClient } from "react-query";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import Loader from "../../loader";
export default function GlobalForm({
  children,
  handleSubmit,
  reset,
  setfile,
  setfile1,
  url,
  onedataId,
  id,
}) {
  const queryClient = useQueryClient()
  const [params, setSearchParams] = useSearchParams();
  const [loader,setLoader] = useState(false)
  const handleAdd = async (data) => {
      setLoader(true)
    if (params.get("openMadal") == "post") {
      await AddData(url, data)
        .then((response) => {
          queryClient.invalidateQueries([url])
          setSearchParams({
            ...paramsToObject(params.entries()),
            openMadal: "",
          })
          reset()
          if(setfile.length){
            setfile(null)
          }
          if(setfile1.length){
            setfile1(null)
          }
          setLoader(false)
          toast("successful create")
        })
        .catch((error) => {
          setLoader(false)
          toast.error(error?.response?.data?.message)

        });
    }
    if (params.get("openMadal") == "put") {
      await UpdateData(url, data, onedataId)
        .then((response) => {
          queryClient.invalidateQueries([url])
          setSearchParams({
            ...paramsToObject(params.entries()),
            openMadal: "",
          })
          reset()
          if(setfile.length){
            setfile(null)
          }
          if(setfile1.length){
            setfile1(null)
          }
          
          setLoader(false)
          toast("successful update")
        })
        .catch((error) => {
          setLoader(false)
          toast.error(error?.response?.data?.message)
        });
    }
  };


  const Testfunction = () => console.log("error");
  return (
    <form
      className={`${cls.GlobalForm} ${params.get("openMadal") == "post" || params.get("openMadal") == "put"
        ? cls.GlobalForm__open
        : ""
        }`}
      onSubmit={handleSubmit ? handleSubmit(handleAdd) : Testfunction()}
    >
      {/* <div className={cls.GlobalForm__div}></div> */}
      {children}
      <div className={cls.GlobalForm__btns}>
        <CancelBtn
          onClick={() => {
            setSearchParams({
              ...paramsToObject(params.entries()),
              openMadal: "",
            })
            reset()
            if(setfile.length){
            setfile(null)
            }
            if(setfile1.length){
            setfile1(null)
            }
          }
          }
          style={{ maxWidth: "120px" }}
        >
          Отменить
        </CancelBtn>
        <BlueBtn
          type="submit"
          style={{
            background: "#58A43E",
            maxWidth: "120px",
            borderRadius: "3px",
          }}
        >
          Сохранить
        </BlueBtn>
      </div>

      <Toaster />
      

      {loader && <Loader onClick={()=>setLoader(false)}/>}
    </form>
  );
}

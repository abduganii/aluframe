import { useState } from 'react'
import { FileUpload } from '../../../../services/file-uplaod'
import BlueBtn from '../../button/blue-buttun'
import { Uploadcon, UploadLitelIcon } from '../../icons'
import cls from './uploadInputCount.module.scss'

export default function UploadInputCount({setCount= {}}) {
  const [openMadal, setOpenMada] = useState(false)
  const [inputValue ,setInputValue] = useState(null)
  const [imageValue ,setImageValue] = useState(null)
  const [imageName ,setImageName] = useState(null)

  const hendleimg = async (e) => {
    if (e.target.files[0]) {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      const data = await FileUpload(formData)
   
      setImageValue(data?.data?.image_url)
      setImageName(data?.data?.image_name)
    }

  };
  return (
    <>
    <div className={cls.UploadInputCount}>
      <div className={cls.UploadInputCount__input} onClick={()=>setOpenMada(true)}>+</div>
      
      {openMadal ?
        <div className={cls.UploadInputCount__wrap}>
        <div className={cls.UploadInputCount__wrap__div}>
              <input
                className={cls.UploadInputCount__wrap__input}
                type={"number"}
                placeholder={"Число"}
                value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <label className={cls.UploadInputCount__lebal}>
        <input
          type={"file"}
            onChange={(e)=>hendleimg(e)}
          />
          <div className={cls.UploadInputCount__wrap__inputFile}>
          <Uploadcon />
          <p>Фото</p>
          </div>
        </label>
       </div>
            <BlueBtn style={{ "borderRadius": "5px", padding: "11px " }} onClick={() => {
          setCount(
            state => [
              {
              number: inputValue,
              image_name: imageName,
              image_url:imageValue
              },
              ...state
            ]
          )
          setOpenMada(false)
      
          setInputValue('')
             
            }}>Добавить</BlueBtn>
      </div>:""
        }
      </div>
      {
        openMadal ? <div className={cls.Backround} onClick={() => {
       
          setOpenMada(false)
        

        }}>  

</div>:""
    }
    </>
  )
}

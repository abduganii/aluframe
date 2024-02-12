import { FileUpload } from "../../../../services/file-uplaod";
import { Uploadcon } from "../../icons";
import cls from "./addInput.module.scss";

const UploadInput = ({ value, onChange, setValue, className, ...other }) => {

  console.log(value)
  return (
    <div className={cls.AddInput__wrap}>
      <label
        className={`${cls.AddInput} ${value && cls.AddInput__value}`}
        {...other}
      >
        <input type="file" accept="image/jpeg, image/png" onChange={onChange} />
        {value ? <img src={value} width={55} height={65} /> : <Uploadcon />}
      </label>
    </div>
  );
};

export default UploadInput;

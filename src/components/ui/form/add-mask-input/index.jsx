import ReactInputMask from "react-input-mask";
import cls from "./addInput.module.scss";

const AddMaskInput = ({
  placeholder,
  value,
  onChange,
  alert,
  mask = { mask },
  setError,
  register = {},
  className,
  ...other
}) => {
  return (
    <div className={cls.AddInput__wrap}>
      <ReactInputMask
        className={`${cls.AddInput} ${className && className}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        mask={mask}
        {...register}
        {...setError}
        {...other}
      />
    </div>
  );
};

export default AddMaskInput;

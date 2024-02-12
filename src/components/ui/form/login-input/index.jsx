import cls from "./authlogin.module.scss";

export default function LoginInput({
  label,
  register = {},
  alert,
  setError,
  type,
  placeholder,
  onChange,
  ...other
}) {
  console.log(alert)
  return (
    <label className={cls.LoginInput} {...other}>
      <p className={cls.LoginInput__text}>{label}</p>
      <input
        className={cls.LoginInput__input}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...register}
        {...setError}
      />
     {alert ? <p className={cls.LoginInput__alert}>{ alert}</p>:""}
    </label>
  );
}

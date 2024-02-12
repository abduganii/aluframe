import cls from "./blueButton.module.scss";

export default function BlueBtn({
  children,
  className,
  type = "button",
  onClick,
  onChange,
  ...other
}) {
  return (
    <button
      className={`${cls.BlueBtn} ${className && className}`}
      type={type}
      onClick={onClick}
      onChange={onChange}
      {...other}
    >
      {children}
    </button>
  );
}

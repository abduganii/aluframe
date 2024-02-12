import cls from "./checkBoxWindow.module.scss";

export default function CheckWindow({ check, title, text, onClick, ...other }) {
    return (
        <div
            className={`${cls.checkWindow} ${check && cls.checkWindow__active}`}
            onClick={onClick}
            {...other}
        >
            <input type="radio" checked={check} />
            <p className={cls.checkWindow__title}>{title}</p>
            <p className={cls.checkWindow__text}>{text}</p>
        </div>
    );
}
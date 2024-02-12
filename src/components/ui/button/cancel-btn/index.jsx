import cls from './blueButton.module.scss'

export default function CancelBtn({ children, onClick, ...other }) {
    return (
        <div className={cls.BlueBtn} onClick={onClick}  {...other} >
            {children}
        </div>
    )
}

import cls from "./dropdawn.module.scss"

export default function DropDawn({ array, onClick, ...other }) {
    return (
        <ul className={cls.DropDawn} {...other}>
            {array?.map(e => (
                <li key={e?.id} value={e?.text} onClick={()=>onClick(e?.id)}>{e?.name}</li>
            ))}
        </ul>
    )
}

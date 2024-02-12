import { useQueryClient } from "react-query";
import { DeleteData } from "../../../services/glabal";
import StatusBtn from "../button/status-btn";
import CheckBox from "../form/checkBox";
import { CommitIcon, DeleteIcon, DocIcon, EditIcon, EyeIcon, UploadLitelIcon } from "../icons";
import cls from "./itemList.module.scss";

export default function ListItem({
  id,
  img,
  img2,
  name,
  time,
  PositionPen = [],
  tel,
  details = [],
  price,
  pdf1,
  pdf2,
  pdf3,
  pdf4,
  status,
  statusColor,
  role,
  countType,
  statusChange,
  statusArr=[],
  update,
  remove,
}) {
  

  return (
    <li className={`${cls.ListItem} ${img && cls.ListItem__withImg} `}>
      <CheckBox />
      {img ? (
        <div className={cls.ListItem__img}>
          {img == "empty" ? (
            <img src="/img.svg" width={60} height={70} alt="img" />
          ) : (
            <img src={img} width={60} height={70} alt="img" />
          )}
        </div>
      ) : (
        ""
      )}
      {img2 ? (
        <div className={cls.ListItem__img}>
          {img2 == "empty" ? (
            <img src="/img.svg" width={60} height={70} alt="img" />
          ) : (
            <img src={img2} width={60} height={70} alt="img" />
          )}
        </div>
      ) : (
        ""
      )}

      {id && <p className={cls.ListItem__detail}>{id}</p>}
      {time && <p className={cls.ListItem__detail}>{time}</p>}
      {name && <p className={cls.ListItem__name}>{name}</p>}
      {tel && <p className={cls.ListItem__tel}>{tel}</p>}

      {countType && <div className={cls.ListItem__countType}>
        {countType?.map((e, i) => (
          <p key={i}>
            <div>
              <UploadLitelIcon />
            </div>
            {e?.number}
          </p>
        ))}
      </div>}
      {PositionPen.length ? <div className={cls.ListItem__detail1}>
       {PositionPen?.map(e => (
         <span key={e?.id} className={cls.ListItem__detail__text}>{ e?.name}</span>
      ))}
    </div>:""}
      {details?.length ?
        details?.map((e, i) => (
          <p key={i} className={cls.ListItem__detail}>
            {e}
          </p>
        )):""}
      {price && <p className={cls.ListItem__price}>{price}</p>}
      {status && <StatusBtn label={status} role={role} statusColor={statusColor} statusArr={statusArr} onChange={(e)=>statusChange(e)} />}
      <div className={cls.ListItem__action}>
        {/* <div>
          <CommitIcon />
        </div>
      
        <div>
          <EyeIcon />
        </div> */}

        {pdf1 && <div onClick={pdf1}>
          <DocIcon />
        </div>}
        {pdf2 && <div onClick={pdf2}>
          <DocIcon />
        </div>}
        {pdf3 && <div onClick={pdf3}>
          <DocIcon />
        </div>}
        {pdf4 && <div onClick={pdf4}>
          <DocIcon />
        </div>}
        {update && <div onClick={update}>
          <EditIcon />
        </div>
        }
        {remove && <div onClick={remove}>
          <DeleteIcon fill={"#484038"} />
        </div>}
      </div>
    </li>
  );
}

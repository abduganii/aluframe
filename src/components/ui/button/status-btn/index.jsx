import { statusOder } from "../../filter/data"
import { ScrollIcon } from "../../icons"
import DropDawn from '../../dropdawn'
import cls from "./statusBtn.module.scss"
import { useRef, useState } from "react"

export default function StatusBtn({ label,role,statusArr,statusColor, onChange }) {
    const [openStatus, setOpenSatus] = useState(false)
    const [bac, setbac] = useState(false)
  
    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');
      
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
      
        return `${r}, ${g}, ${b}`;
      };

    return (
        <>
            <div className={cls.StatusBtn}>
                <p className={cls.StatusBtn__text}  style={{color:statusColor,backgroundColor: `rgba(${hexToRgb(statusColor)}, ${.2})`}} onClick={role == "admin" || role == "superadmin" ?() => {
                    setOpenSatus(true)
                    setbac(true)
                } : null}>{label}
                   {role == "admin" || role == "superadmin"? <ScrollIcon color={statusColor} />:""}
                </p>
                {
                    openStatus && <DropDawn
                        array={statusArr}
                        onClick={(e) => {
                            setbac(false)
                            setOpenSatus(false)
                            onChange(e)
                        }
                        }
                        style={{ top: "44px", left: "0px" }}
                    />
                }
            </div>
          {bac ?  <div 
                onClick={(e) => {
                        setbac(false)
                        setOpenSatus(false)
                }} className={cls.backruond}
            ></div>:""}
        </>
    )
}

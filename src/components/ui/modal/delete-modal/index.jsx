import { useQueryClient } from "react-query"
import { useSearchParams } from "react-router-dom"
import paramsToObject from "../../../../hooks/paramsToObject"
import { DeleteData } from "../../../../services/glabal"
import BlueBtn from "../../button/blue-buttun"
import CancelBtn from "../../button/cancel-btn"
import cls from "./delete.module.scss"

export default function DeleteModal({ url }) {
    const queryClient = useQueryClient()
    const [params, setSearchParams] = useSearchParams()
    return (
        <>

            {params.get("deleteId") && <>
                <div className={cls.DeleteModal}>

                    <div className={cls.DeleteModal__content}>
                        <h3> Do you wanna delete id!</h3>
                        <div>
                            <CancelBtn onClick={() =>
                                setSearchParams({
                                    ...paramsToObject(params.entries()),
                                    deleteId: ""
                                })}>cencel</CancelBtn>
                            <BlueBtn onClick={async () => {
                                await DeleteData(url, params.get("deleteId"))
                                    .then(data => {
                                        queryClient.invalidateQueries([url])
                                        setSearchParams({
                                            ...paramsToObject(params.entries()),
                                            deleteId: ""
                                        })
                                    })
                                    .catch(error => console.log(error))
                            }}>
                                delete
                            </BlueBtn>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}

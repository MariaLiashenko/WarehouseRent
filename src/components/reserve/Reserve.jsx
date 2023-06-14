import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

import "./reserve.css"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { t } from "i18next"

const Reserve = ({ setOpen, warehouseId, priceAll }) => {
  const [available, setAvailable] = useState(true)
  const { dates } = useContext(SearchContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  console.log(priceAll)

  const handleClick = async () => {
    console.log({ dates })
    console.log(dates[0].startDate.toISOString().slice(0, 10))
    const moment = require("moment")
    const dateStart = moment(
      dates[0].startDate,
      "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (ZZZ)"
    )
    const dateEnd = moment(
      dates[0].endDate,
      "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (ZZZ)"
    )
    const formattedStartDate = dateStart.format("YYYY-MM-DD")
    const formattedEndDate = dateEnd.format("YYYY-MM-DD")

    console.log("formattedDate" + formattedStartDate)
    console.log("formattedDate" + formattedEndDate)

    try {
      const res = await axios.post(`/reservations/${warehouseId}`, {
        user: user._id,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        totalPrice: priceAll,
      })
      setOpen(false)
      navigate("/")
      return res
    } catch (err) {
      console.log("не повезло")
      setAvailable(false)
    }
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span> {t("reserve.span", { ns: "pages" })}</span>

        {available ? (
          <button onClick={handleClick} className="rButton">
            {t("reserve.btn", { ns: "pages" })}
          </button>
        ) : (
          <>
            <p>{t("reserve.p", { ns: "pages" })}</p>
            <p>{t("reserve.pp", { ns: "pages" })}</p>
          </>
        )}
      </div>
    </div>
  )
}
export default Reserve

import "./list.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-date-range"
import SearchItem from "../../components/searchItem/SearchItem"
import useFetch from "../../hooks/useFetch.js"
import i18next from "i18next"
import { useTranslation } from "react-i18next"

const List = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const language = i18n.language

  const { data, loading, error, reFetch } = useFetch(
    `/warehouses?${language}.city=${destination}&min=${min || 0}&max=${
      max || 50000
    }`
  )
  console.log("data " + data)
  console.log("sapros " + `/warehouses?${language}.city=${destination}`)

  const handleClick = () => {
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">{t("list.lsTitle", { ns: "pages" })}</h1>
            <div className="lsItem">
              <label>{t("list.lsItem", { ns: "pages" })}</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>{t("list.date", { ns: "pages" })}</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>{t("list.lsItemOp", { ns: "pages" })}</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    {t("list.lsOptionTextMin", { ns: "pages" })}{" "}
                    <small>{t("list.perNight", { ns: "pages" })}</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    {t("list.lsOptionTextMax", { ns: "pages" })}{" "}
                    <small>{t("list.perNight", { ns: "pages" })}</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>
              {t("list.btn", { ns: "pages" })}
            </button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List

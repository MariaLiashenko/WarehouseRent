import "./warehouse.css"
import { useTranslation } from "react-i18next"
import useFetch from "../../hooks/useFetch.js"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import Reserve from "../../components/reserve/Reserve"

const Warehouse = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { data, loading, error } = useFetch(`/warehouses/find/${id}`)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const { dates } = useContext(SearchContext)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }
  console.log({ dates })

  const days = dayDifference(dates[0].endDate, dates[0].startDate)

  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate("/login")
    }
  }

  const handleMove = (direction) => {
    let newSlideNumber

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }
  const price =
    days / 30 < 12
      ? (days / 30) * data.priceMonth
      : (days / 30 / 12) * data.priceYear

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {data.length == 0 && days.length == 0 ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <h1 className="hotelTitle">
              {data[language] && data[language].name}
            </h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span> {data[language] && data[language].adress}</span>
            </div>
            <div className="hotelfl">
              <span className="hotelDistance">
                {data[language] && data[language].city}
              </span>
              <span className="hotelPriceHighlight">
                {data.electricity &&
                  t("warehouse.electricity", { ns: "pages" })}
              </span>
              <span className="hotelPriceHighlight">
                {data.plumbing && t("warehouse.plumbing", { ns: "pages" })}
              </span>
              <span className="hotelPriceHighlight">
                {data.protection && t("warehouse.protection", { ns: "pages" })}
              </span>
            </div>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle"></h1>
                <p className="hotelDesc">
                  {data[language] && data[language].description}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <span>{data[language] && data[language].city}</span>
                <h2>
                  <b>{price}₴</b> ({days} {t("warehouse.days", { ns: "pages" })}
                  )
                </h2>
                <button onClick={handleClick}>
                  {t("warehouse.btn", { ns: "pages" })}
                </button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && (
        <Reserve setOpen={setOpenModal} warehouseId={id} priceAll={price} />
      )}
    </div>
  )
}

export default Warehouse

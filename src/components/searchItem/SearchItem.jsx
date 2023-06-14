import { Link } from "react-router-dom"
import "./searchItem.css"
import { useTranslation } from "react-i18next"

const SearchItem = ({ item }) => {
  const { t, i18n } = useTranslation()
  const language = i18n.language

  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item[language].name}</h1>
        <span className="siDistance">{item[language].adress}</span>
        <span className="siSubtitle">{item[language].city}</span>
        <span className="siFeatures">{item[language].size}</span>
      </div>
      <div className="siDetails">
        <div className="siDetailTexts">
          <span className="siPrice">
            {item.priceMonth}₴ {t("searchItem.month", { ns: "pages" })}
          </span>
          <span className="siPrice">
            {item.priceYear}₴ {t("searchItem.year", { ns: "pages" })}
          </span>
          <Link to={`/warehouses/${item._id}`}>
            <button className="siCheckButton">
              {t("searchItem.siCheckButton", { ns: "pages" })}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem

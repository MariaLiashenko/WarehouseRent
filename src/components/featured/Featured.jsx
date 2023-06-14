import { t } from "i18next"
import useFetch from "../../hooks/useFetch.js"
import "./featured.css"

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/warehouses/countByCity?cities=Kyiv,Kharkiv,Lviv,Odesa"
  )
  console.log("my data  " + data)

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://www.globsec.org/sites/default/files/styles/inline/public/2022-10/AdobeStock_237922991-scaled-e1666004413531.jpeg?itok=oRrVvn-5"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{t("featured.featuredTitlesKyi", { ns: "pages" })}</h1>
              <h2>
                {data[0]} {t("featured.properties", { ns: "pages" })}
              </h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://traveltoukraine.org/wp-content/uploads/2019/01/Poltava2.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{t("featured.featuredTitlesKh", { ns: "pages" })}</h1>
              <h2>
                {data[1]} {t("featured.properties", { ns: "pages" })}
              </h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://ukraine.ua/wp-content/uploads/2020/09/Lviv-market-square.Ruslan-Lytvyn.shutterstock-1536x1024.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{t("featured.featuredTitlesLv", { ns: "pages" })}</h1>
              <h2>
                {data[2]} {t("featured.properties", { ns: "pages" })}
              </h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://34travel.me/media/upload/images/2021/JULY/odessa/IMG_5371.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{t("featured.featuredTitlesOd", { ns: "pages" })}</h1>
              <h2>
                {data[3]} {t("featured.properties", { ns: "pages" })}
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Featured

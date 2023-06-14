import React, { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import NavBarDropdown from "./components/NavbarDropdown.jsx"
import "./navbar.css"
import i18next from "i18next"
import { AuthContext } from "../../context/AuthContext.js"
import { Link } from "react-router-dom"

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
  const [nav, setNav] = useState(false)

  const changeLanguage = (lang, e) => {
    setSelectedLanguage(lang)
    e.preventDefault()
    i18next.changeLanguage(lang)
    setNav(false)
  }
  const language = i18n.language
  var cookies = document.cookie.split(";")
  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split("="),
      name = parts[0],
      value = parts[1]
  }
  console.log("my lang" + document.cookie)
  const { user } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">FastWareHouses</span>
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <Link to="/register" style={{ textDecoration: "none" }}>
              <button className="navButton">
                {t("navbar.btnreg", { ns: "pages" })}
              </button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="navButton">
                {t("navbar.btnlog", { ns: "pages" })}
              </button>
            </Link>
          </div>
        )}
        <div className="language">
          <NavBarDropdown
            defaultClick={() => {
              setNav(false)
            }}
            title={selectedLanguage === "en" ? "ENG" : "УКР"}
            items={[
              {
                title: "Українська",
                active: selectedLanguage === "ukr",
                onClick: (e) => changeLanguage("ukr", e),
              },
              {
                title: "English",
                active: selectedLanguage === "en",
                onClick: (e) => changeLanguage("en", e),
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar

import { t } from "i18next"
import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">{t("mail.mailTitle", { ns: "pages" })}</h1>
      <span className="mailDesc">{t("mail.mailDesc", { ns: "pages" })}</span>
      <div className="mailInputContainer">
        <input
          type="text"
          placeholder={t("mail.placeholder", { ns: "pages" })}
        />
        <button>{t("mail.btn", { ns: "pages" })}</button>
      </div>
    </div>
  )
}

export default MailList

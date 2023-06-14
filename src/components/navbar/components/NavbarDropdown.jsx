import { useState } from "react"
import "./navbarDropdown.css"

import Path from "../../../assets/images/Path.svg"
// import NavBarItem from "../NavBarItem/NavBarItem"

const NavBarDropdown = ({ title, items, defaultClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdownHandler = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const closeDropdownHandler = () => {
    setIsDropdownOpen(true)
  }

  const checkIfCloseHandler = (e) => {
    const { relatedTarget } = e
    if (
      !relatedTarget.closest(".menu__dropdown") &&
      !relatedTarget.closest(".menu__dropdown-helper")
    )
      setIsDropdownOpen(false)
  }

  return (
    <li className="menu__item" onClick={toggleDropdownHandler}>
      <div
        style={{ display: isDropdownOpen ? "block" : "none" }}
        className="menu__dropdown-helper"
        onMouseLeave={checkIfCloseHandler}
      ></div>
      <span className="menu__projects">{title}</span>
      <img
        src={Path}
        alt="Menu Icon"
        className={`menu__icon ${isDropdownOpen ? "show" : "hide"}`}
      />
      <ul
        className={`dropdown-content ${isDropdownOpen ? "show" : "hide"}`}
        onMouseLeave={checkIfCloseHandler}
      >
        {items.map((item, i) => (
          <li
            className="menu__dropdown"
            onClick={(e) => {
              closeDropdownHandler()
              item.onClick && item.onClick(e)
              defaultClick(e)
            }}
          >
            <span className="menu__dropdown-item">{item.title}</span>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default NavBarDropdown

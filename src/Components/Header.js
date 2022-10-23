import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="header-algos">
      <Link className="logo" to="/">
        <img src="/images/logo.svg" alt="logo" />
        <span>ALGOLIZER</span>
      </Link>
      <nav>
        <ul className="nav__links">
          <li>
            <Link to="/sort">Sort Algos</Link>
          </li>
          <li>
            <Link to="/search">Search Algos</Link>
          </li>
        </ul>
      </nav>
      <Link className="cta" to="#">
        Github
      </Link>
    </header>
  )
}

export default Header

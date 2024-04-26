import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './HomeNav.module.css'

function HomeNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default HomeNav
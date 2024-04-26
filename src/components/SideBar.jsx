import React from 'react'
import styles from './SideBar.module.css'
import JourneyNav from './JourneyNav'
import { Outlet } from 'react-router-dom'

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <h1>React-Journey-Mapper</h1>
      <JourneyNav />
      <Outlet />
      {/* <p>here goes list of cities</p> */}
    </div>
  )
}

export default SideBar
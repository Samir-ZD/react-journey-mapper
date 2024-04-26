import React from 'react'
import HomeNav from '../components/HomeNav'
import styles from './About.module.css'

function About() {
  return (
    <section className={styles.about}>
      <HomeNav />
      <h2>
        A world map that tracks your footsteps into every city you can think
        of.
      </h2>
    </section>
  )
}

export default About
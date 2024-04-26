import React, { useContext } from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import CitiesContext from '../context/CitiesContext'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date))


function CityItem({ city }) {

  const handleDeleteCity = async (e) => {
    e.preventDefault()
    deleteCity(id)
  }


  const { currentCity, deleteCity } = useContext(CitiesContext)
  const { id, emoji, cityName, date, position } = city
  return (
    <li>
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={handleDeleteCity} className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  )
}
export default CityItem
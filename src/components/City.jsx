import React, { useContext, useEffect } from 'react'
import styles from './City.module.css'
import { useParams, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CitiesContext from '../context/CitiesContext'

function City() {

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  const navigate = useNavigate()

  const { id } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')


  const { getCity, currentCity, isLoading } = useContext(CitiesContext)

  useEffect(() => {
    getCity(id); 
}, [getCity, id]); 

  const { cityName, emoji, date, notes } = currentCity;
  console.log(cityName)
  
  if (isLoading) return <h3>Loading...</h3>
  return (
    <>
      <div className={styles.city}>
        <div className={styles.row}>
          <h6>City name</h6>
          <h3>
            <span>{emoji}</span> {cityName}
          </h3>
        </div>

        <div className={styles.row}>
          <h6>You went to {cityName} on</h6>
          <p>{formatDate(date || null)}</p>
        </div>

        {notes && (
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{notes}</p>
          </div>
        )}

        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>
        <div>
          <button className={`${styles.btn} ${styles.back}`} onClick={(e) => { e.preventDefault(); navigate(-1) }}>&larr; Back</button>
        </div>
      </div>
    </>
  )
}

export default City
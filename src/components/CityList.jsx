import React, { useContext } from 'react'
import styles from './CityList.module.css'
import CityItem from './CityItem'
import CitiesContext from '../context/CitiesContext'

function CityList() {

    const {cities, isLoading} = useContext(CitiesContext)
    console.log(typeof(cities))
    if (isLoading) return <p>Loading...</p>
    if (!cities.length) return <h1>Pick Your First City!!</h1>

    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem city={city} key={city.id} />)}
        </ul>
    )
}

export default CityList
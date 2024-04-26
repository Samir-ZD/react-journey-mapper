import React, { useContext } from 'react'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import CitiesContext from '../context/CitiesContext'


function CountryList() {

  const {cities, isLoading} = useContext(CitiesContext) 

  if (isLoading) return <p>Loading...</p>
  if (!cities.length) return <h1>Pick Your First City!!</h1>

  // return unique country names & emojies   
  const countries = cities.reduce((acc, city) => {
    const { country, emoji } = city;
    const countryExists = acc.find(item => item.country === country);
    if (!countryExists) {
      acc.push({ country, emoji });
    }
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => <CountryItem country={country} key={country.country}/>)}
    </ul>
  )
}
export default CountryList
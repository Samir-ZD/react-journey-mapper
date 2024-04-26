import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CitiesContext from '../context/CitiesContext'


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  
  //states
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [cityIsLoading, setCityisLoading] = useState(false)
  const [emoji, setEmoji] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  //react-router
  const navigate = useNavigate()

  //custom hook
  const [lat, lng] = useUrlPosition()
  //context 
  const {createCity, isLoading} = useContext(CitiesContext)
  // console.log(lat, lng)

  useEffect(() => {

    if(!lat && ! lng) return;

    const fetchCityData = async () => {
      try {
        setCityisLoading(true)
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()

        if (!data.countryName) throw new Error("not a country ")

        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
        setErrorMessage("")
        console.log(data)

      } catch (err) {
        console.log(err)
        setErrorMessage(err.message)

      } finally {
        setCityisLoading(false)
      }
    }
    fetchCityData()
  }, [lat, lng])

  const handleSubmit= async (e)=>{
    e.preventDefault()

    if(!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{lat,lng}
    }

    await createCity(newCity)
    console.log(newCity)
    navigate('/journey/cities')
  }


  //form render logic
  if(!lat && ! lng) return <h2>Start by clicking on the map</h2>;
  if (cityIsLoading) return <h2>Loading</h2>
  if (errorMessage) return <h2>This doesn't seem to be a city, please click on a City</h2>

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
        id="date"
        onChange={(date) => setDate(date)}
        selected={date}
        dateFormat="dd/MM/YYYY"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={`${styles.btn} ${styles.primary}`}>Add</button>
        <button className={`${styles.btn} ${styles.back}`} onClick={(e) => { e.preventDefault(); navigate(-1) }}>&larr; Back</button>
      </div>
    </form>
  );
}
export default Form;


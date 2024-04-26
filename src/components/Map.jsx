import React, { useContext, useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { useGeolocation } from '../hooks/useGeolocation'
import { useUrlPosition } from '../hooks/useUrlPosition'
import CitiesContext from '../context/CitiesContext'

function Map() {


  const [mapPosition, setMapPosition] = useState([40, 0])

  const { cities } = useContext(CitiesContext)

  console.log(cities)

  const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeolocation()

  const [lat,lng] = useUrlPosition()


  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng])
  }, [lat, lng])

  useEffect(() => {
    if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
  }, [geoLocationPosition])

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (<button className={`${styles.btn} ${styles.primary} ${styles.position}`} onClick={getPosition}>Use Your Location</button>)}
      <MapContainer center={mapPosition} zoom={8} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {cities.map((city) =>
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji} <span>{city.cityName}</span></span>
            </Popup>
          </Marker>)}
        <ChangeCenter position={mapPosition} />
        <MapOnClick />
      </MapContainer>
      {/* <h1>Postion: {lat}, {lng}</h1> */}
    </div>
  )
}

// Custom Components -> features not available in react-leaflet 
function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position, 7)
  return null
}

function MapOnClick() {
  const navigate = useNavigate()
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}

export default Map
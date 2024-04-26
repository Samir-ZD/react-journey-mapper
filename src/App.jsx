import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CitiesProvider } from './context/CitiesContext'

import CountryList from './components/CountryList'
import CityList from './components/CityList'
import City from './components/City'
import Form from './components/Form'

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))
const Journey = lazy(() => import("./pages/Journey"))


function App() {

  return (
    <CitiesProvider>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading</h1>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="journey" element={<Journey />}>
              {/* Nested Routes: /journey/example */}
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CitiesProvider>
  )
}
export default App

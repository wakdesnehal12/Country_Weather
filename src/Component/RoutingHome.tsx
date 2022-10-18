import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CountryForm from './CountryForm'
import { CountryWeather } from './CountryWeather'
import FetchCountry from './FetchCountry'
import { UserData } from './UserData'

const RoutingHome = () => {
  return (
    <div>
      <UserData>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CountryForm/>}/>
            <Route path="/fetchcountry" element={<FetchCountry/>}/>
            <Route path="/countryweather" element={<CountryWeather/>}/>
          </Routes>
        </BrowserRouter>
      </UserData>
    </div>
  )
}

export default RoutingHome
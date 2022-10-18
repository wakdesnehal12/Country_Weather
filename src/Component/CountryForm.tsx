import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dataProvider } from './UserData'

const CountryForm = () => {
    const {countryName, setCountryName} = useContext(dataProvider)
    const navigate = useNavigate()
    
    const enabled = countryName.length > 0

    const submitHandler = () => {
        navigate(`/fetchcountry`)
    }
  return (
    <>  
        <Box className="nameBox">
            <TextField
                label="Enter Country"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                data-testid="countryName"
            />
            <Button variant="outlined" disabled={!enabled} onClick={submitHandler}>Submit</Button>
        </Box>
        
    </>
  )
}

export default CountryForm
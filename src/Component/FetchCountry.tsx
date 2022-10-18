import { Button, Card, CardContent, Container, ImageListItem, TextField, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dataProvider } from './UserData'

const FetchCountry = () => {
    const {countryName, setCountryName} = useContext(dataProvider)
    const navigate = useNavigate()
    const [data, setData] = useState<any>([])
    
    const baseUrl = 'https://restcountries.com/v3.1/name'
    
    const loadData = async () => {
        await fetch(`${baseUrl}/${countryName}`)
        .then(res => res.json())
        .then((result) => {
            // console.log(result)
            setData(result)
        })
    }

    useEffect(() => {
        loadData()
    },[])

    const handleSubmit = () => {
        navigate(`/countryweather`, {state:{allData:data}})
    }
    return(
        <>
        <Container>
            {
                data.map((item:any, _id:any) => {
                    return(
                        <Card key={_id} className="countryBox">   
                            <Box className="countryName"> 
                                <ImageListItem><img width={100} height={100} src={item.flags.png} alt="flag"/></ImageListItem>
                                <CardContent className="countrname">{item.name.common}</CardContent>
                            </Box>
                            <CardContent className="capitalName" data-testId="capital"> Capital:- {item.capital}</CardContent>
                            <CardContent className="countrypop"> Population:- {item.population}</CardContent>
                            <CardContent className="countrylang"> Country Lat Lang:- {item.latlng}</CardContent>
                            <Button data-testid={`button-${_id}`} variant='outlined' onClick={handleSubmit}>Capital Weather</Button>
                        </Card>
                    )
                })
            }
        </Container>
        </>
    )
}

export default FetchCountry
import { Card, CardContent, ImageListItem, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const CountryWeather = () => {
    const [weatherData, setWeatherData] = useState<any>([])
    const {state}:any = useLocation()
    
    const capitalName = [state.allData[0].capital]
    // console.log(state)

    const loadData = async() => {
        await fetch(`http://api.weatherstack.com/current?access_key=758c0d8c6139111ee112bd00beebe5a7&query=${capitalName}`)
        .then(res => res.json())
        .then((result) => {
            // console.log(result)
            setWeatherData([result])
        })
    }

    useEffect(() => {
        loadData()
    },[])
    return (
        <div>
            <Container>
            {
                weatherData.map((item:any, key: number) => {
                    return(
                        <Card key={key}>
                                <CardContent className="weatherBox" >
                                    <ImageListItem><img src={item.current.weather_icons} alt="icon"/></ImageListItem>
                                    <Typography>Temperature: {item.current.temperature}</Typography>
                                    <Typography>Wind-Speed: {item.current.wind_speed}</Typography>
                                    <Typography>Precip: {item.current.precip}</Typography>
                                </CardContent>
                            </Card>
                        
                    )
                })
            }
            </Container>
        </div>
    )
}

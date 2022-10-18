import { getAllByText, screen, getAllByTestId, getByText, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useLocation } from "react-router-dom";
import { CountryWeather } from "./CountryWeather";
import { Card, CardContent, ImageListItem, Typography } from '@mui/material';
import { UserData } from "./UserData";
import FetchCountry from "./FetchCountry";

jest.mock('react-router', () => ({
    ...jest.requireActual("react-router"),
    useLocation: () => ({
        pathname: '/',
        state: {
            allData:[
                {
                    capital: 'New Delhi', 
                }
            ]
        }
    })
}));

describe('Weather of Country', () => {
    let originalFetch:any;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(
                {
                    current:[
                        {
                            temperature: 12
                        }
                    ]
                }
            ) 
        }))as jest.Mock

       
    });

    test('should fetch a list of tasks', async () => {
        await  act (async () => {render(<CountryWeather/>)})
        const fetchSpy = jest.spyOn(global, 'fetch')
        expect (fetchSpy).toBeCalled();
    });
    test('Should match snapshot', async () => {
        await act(async () => { await render(<CountryWeather/>)})
        expect(screen).toMatchSnapshot();
    });
})


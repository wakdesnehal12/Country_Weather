import { render, screen, fireEvent, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import FetchCountry from '../FetchCountry';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate
}))

 
describe("FetchCountry", () => {
    let originalFetch:any;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([
                {
                    name: {
                        common: "test"
                    },
                    capital: "New Delhi",
                    population: 12365400,
                    flags: {
                        png: 'https://imageurl.in'
                    }
                }
               ]
            ) 
        }))as jest.Mock
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    test('Should match snapshot', async () => {
        await act(async () => { await render(<FetchCountry/>)})
        expect(screen).toMatchSnapshot();
    });
    test('should be navigate',  () => {
        render(<FetchCountry/>)
        fireEvent.click(screen.getByTestId('button-1'))
        expect(mockedUsedNavigate).toBeCalledWith('/countryweather');
    });
});
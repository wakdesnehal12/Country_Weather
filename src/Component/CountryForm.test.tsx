import { fireEvent, getByLabelText, render, renderHook, screen } from '@testing-library/react';
import CountryForm from './CountryForm';
import { UserData } from './UserData';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate
}))

describe('CountryForm', () => {
    test('check input field', () => {
        render(
            <UserData>
                <CountryForm/>
            </UserData>
        )
        expect(screen.getByTestId('countryName')).toBeInTheDocument();
    })
    test('render the list with buttons', async () => {
        render(
            <UserData>
                <CountryForm/>
            </UserData>
        )
        const btn = await screen.findAllByRole('button')
        expect(btn).toHaveLength(1)
    })

    test('button name', () => {
        render(
            <UserData>
                <CountryForm/>
            </UserData>
        )
        const inpElem = screen.getByRole("button", {name: 'Submit'})
        expect(inpElem).toBeInTheDocument();
    })
    test('navigte', () => {
        const {container} = render(
            <UserData>
                <CountryForm/>
            </UserData>
        )
        const titleElement = screen.getByLabelText('Enter Country')
        const buttonElement = screen.getByRole('button')
        fireEvent.change(titleElement, {target: {value: 'Hello World'}})
        fireEvent.click(buttonElement)
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    })

    test('Should match snapshot',  () => {
        render(
            <UserData>
                <CountryForm/>
            </UserData>
        )
        expect(screen).toMatchSnapshot();
    });
})


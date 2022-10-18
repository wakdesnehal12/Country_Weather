import React, { createContext, useState } from 'react'

export const dataProvider = createContext<any>({})
export const UserData = ({children}:any) => {
   const  [countryName, setCountryName] = useState<any>([])
  return (
    <div>
        <dataProvider.Provider value={{countryName, setCountryName}}>
            {children}
        </dataProvider.Provider>
    </div>
  )
}

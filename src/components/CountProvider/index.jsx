import React, { createContext, useContext, useState } from 'react'
import ButtonM from '../Button'

const Context = createContext({})

export default function CountProvider({ initCount, children }) {
    const [count, setCount] = useState(initCount)

    return (
        <Context.Provider value={{ count, setCount }}>
            {children}
        </Context.Provider>
    )
}

export const useCountContext = () => useContext(Context)
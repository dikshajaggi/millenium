import { createContext, useState } from "react";

const MainContext = createContext()

const MainContextProvider = ({ children }) => {
    const [userLoginToken, setUserLoginToken] = useState(null)
    return (
        <MainContext.Provider value={{
            userLoginToken,
            setUserLoginToken
        }}>
            {children}
        </MainContext.Provider>
    )
}

export { MainContext, MainContextProvider }
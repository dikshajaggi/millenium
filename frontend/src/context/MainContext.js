import { createContext, useState } from "react";

const MainContext = createContext()

const MainContextProvider = ({ children }) => {
    const [userLoginToken, setUserLoginToken] = useState(null)
    const [del, setDelete] = useState(0)
    return (
        <MainContext.Provider value={{
            userLoginToken,
            setUserLoginToken,
            del,
            setDelete
        }}>
            {children}
        </MainContext.Provider>
    )
}

export { MainContext, MainContextProvider }
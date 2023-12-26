import { createContext, useState } from "react";

const MainContext = createContext()

const MainContextProvider = ({ children }) => {
    const [userLoginToken, setUserLoginToken] = useState(null)
    const [del, setDelete] = useState(0)
    const [user, setUser] = useState()
    return (
        <MainContext.Provider value={{
            userLoginToken,
            setUserLoginToken,
            del,
            setDelete,
            user,
            setUser
        }}>
            {children}
        </MainContext.Provider>
    )
}

export { MainContext, MainContextProvider }
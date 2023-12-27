import { createContext, useState } from "react";

const MainContext = createContext()

const MainContextProvider = ({ children }) => {
    const token =  localStorage.getItem('user') ? localStorage.getItem('user').token : null
    const [userLoginToken, setUserLoginToken] = useState(token)
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
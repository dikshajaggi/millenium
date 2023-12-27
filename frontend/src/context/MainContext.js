import { createContext, useState } from "react";

const MainContext = createContext()

const MainContextProvider = ({ children }) => {
    const userDetails =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    const [userLoginToken, setUserLoginToken] = useState(userDetails?.token)
    console.log(userDetails)
    const [del, setDelete] = useState(0)
    const [user, setUser] = useState(userDetails?.name)
    const [qtyUpdated, setQtyUpdated] = useState(false)
    return (
        <MainContext.Provider value={{
            userLoginToken,
            setUserLoginToken,
            del,
            setDelete,
            user,
            setUser,
            qtyUpdated,
            setQtyUpdated
        }}>
            {children}
        </MainContext.Provider>
    )
}

export { MainContext, MainContextProvider }
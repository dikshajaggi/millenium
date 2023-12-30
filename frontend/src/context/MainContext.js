import { createContext, useState } from "react";

const MainContext = createContext()

const MainContextProvider = ({ children }) => {
    const userDetails = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    const [userLoginToken, setUserLoginToken] = useState(userDetails?.token)
    const [del, setDelete] = useState(0)
    const [user, setUser] = useState(userDetails?.name)
    const [qtyUpdated, setQtyUpdated] = useState(false)
    const [searchedProducts, setSearchedProducts] = useState(null)
    const [searched, setSearched] = useState(false)
    const [categorySearch, setCategorySearch] = useState(false)
    return (
        <MainContext.Provider value={{
            userLoginToken,
            setUserLoginToken,
            del,
            setDelete,
            user,
            setUser,
            qtyUpdated,
            setQtyUpdated,
            searchedProducts,
            setSearchedProducts,
            searched,
            setSearched,
            categorySearch,
            setCategorySearch
        }}>
            {children}
        </MainContext.Provider>
    )
}

export { MainContext, MainContextProvider }
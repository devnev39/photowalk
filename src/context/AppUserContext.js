const { createContext, useState, useContext } = require("react");

const AppUserContext = createContext();

export const AppUserContextProvider = ({children}) => {
    const [appUser, setAppUser] = useState(null);

    return (
        <AppUserContext.Provider value={{appUser, setAppUser}}>
            {children}
        </AppUserContext.Provider>
    )
}

export const useAppUserContext = () => {
    return useContext(AppUserContext);
}
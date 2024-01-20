const { createContext, useState, useContext } = require("react");
const PropTypes = require("prop-types");

const AppUserContext = createContext();

const AppUserContextProvider = ({ children }) => {
  const [appUser, setAppUser] = useState(null);

  return (
    <AppUserContext.Provider value={{ appUser, setAppUser }}>
      {children}
    </AppUserContext.Provider>
  );
};

const useAppUserContext = () => {
  return useContext(AppUserContext);
};

AppUserContextProvider.propTypes = {
  children: PropTypes.array,
};

export default {
  AppUserContextProvider,
  useAppUserContext,
};

import { createContext, useContext, useState } from "react";
const PropTypes = require("prop-types");

const ErrorContextProvier = createContext();

const ErrorContext = ({ children }) => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showMessage = (msg, sev) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  return (
    <ErrorContextProvier.Provider
      value={{
        showMessage,
        setMessage,
        message,
        open,
        setOpen,
        handleClick,
        handleClose,
        severity,
        setSeverity,
      }}
    >
      {children}
    </ErrorContextProvier.Provider>
  );
};

ErrorContext.propTypes = {
  children: PropTypes.array,
};

const useAppError = () => {
  return useContext(ErrorContextProvier);
};

export default {
  ErrorContext,
  useAppError,
};

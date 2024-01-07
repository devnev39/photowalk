import React, { createContext, useContext, useState } from 'react'

const ErrorContextProvier = createContext();

export const ErrorContext = ({children}) => {
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info");
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ErrorContextProvier.Provider value={{setMessage, message, open, setOpen, handleClick, handleClose, severity, setSeverity}}>
            {children}
        </ErrorContextProvier.Provider>
    )
}

export const useAppError = () => {
    return useContext(ErrorContextProvier);
}
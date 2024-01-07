const { useContext, createContext, useState } = require("react");

const DialogContextProvider = createContext();

export const DialogContext = ({children}) => {
    const [open, setDialogOpen] = useState(false);

    const handleClickOpen = () => {
      setDialogOpen(true);
    };
  
    const handleClose = () => {
      setDialogOpen(false);
    };

    return (
        <DialogContextProvider.Provider value={{open, handleClickOpen, handleClose}}>
            {children}
        </DialogContextProvider.Provider>
    )
}

export const useDialogContext = () => {
    return useContext(DialogContextProvider);
}
const { useContext, createContext, useState } = require("react");
const DialogContextProvider = createContext();

export const DialogContext = ({ children }) => {
  const [open, setDialogOpen] = useState(false);
  const [dialog, setDialog] = useState("");

  const handleClickOpen = (dialog) => {
    setDialogOpen(true);
    setDialog(dialog);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <DialogContextProvider.Provider
      value={{ open, handleClickOpen, handleClose, dialog }}
    >
      {children}
    </DialogContextProvider.Provider>
  );
};

export const useDialogContext = () => {
  return useContext(DialogContextProvider);
};

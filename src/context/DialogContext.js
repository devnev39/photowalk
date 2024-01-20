const PropTypes = require("prop-types");
const { useContext, createContext, useState } = require("react");
const DialogContextProvider = createContext();

const DialogContext = ({ children }) => {
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

DialogContext.propTypes = {
  children: PropTypes.array,
};

const useDialogContext = () => {
  return useContext(DialogContextProvider);
};

export default {
  DialogContext,
  useDialogContext,
};

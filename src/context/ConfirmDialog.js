const { createContext, useState, useContext } = require("react");

const ConfirmDialogContext = createContext();

export const ConfirmDialogContextProvider = ({ children }) => {
  const [open, setDialogOpen] = useState(false);

  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [current, setCurrent] = useState("");

  const [confirm, setConfirm] = useState(false);

  const handleClickOpen = (cb) => {
    setDialogOpen(true);
  };

  const Confirm = () => {
    setConfirm(true);
    handleClose();
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <ConfirmDialogContext.Provider
      value={{
        open,
        dialogTitle,
        dialogContent,
        confirm,
        current,
        Confirm,
        handleClickOpen,
        handleClose,
        setDialogTitle,
        setDialogContent,
        setCurrent,
      }}
    >
      {children}
    </ConfirmDialogContext.Provider>
  );
};

export const useConfirmDialogContext = () => {
  return useContext(ConfirmDialogContext);
};

import { useAppError } from '@/context/ErrorContext'
import { Alert, Snackbar } from '@mui/material';
import React from 'react'

function Error() {
    const {message, open, handleClose, severity} = useAppError();
    return (
        <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{vertical: "bottom", horizontal: "center"}} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Error
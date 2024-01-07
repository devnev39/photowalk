import { db } from '@/config/firebase';
import { useAppError } from '@/context/ErrorContext';
import { LoadingButton } from '@mui/lab';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { addDoc, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

export default function AdminDialog({ handleClose, updateUsers }) {
    const [isSubmitting, setSubmitting] = useState(false);
    const {setMessage, setSeverity, setOpen} = useAppError();
    const [user, setUser] = useState({
        email: "",
        role: "",
        can_createuser: false,
        can_createplan: false,
        can_updateplan: false,
        is_setupcompleted: false
    });

    const submit = async () => {
        try {
            if(user.email == "" || user.role == ""){
                setMessage("Empty email or role !");
                setSeverity("error");
                setOpen(true);
                return;
            }
            setSubmitting(true);
            user.created_at = new Date().toISOString();
            const userRef = doc(db, "users", user.email);
            await setDoc(userRef, user);
            setSubmitting(false);
            await updateUsers();
            handleClose();

            setMessage("User created successfully !");
            setSeverity("info");
            setOpen(true);
        } catch (error) {
            setMessage(error.message);
            setSeverity("error");
            setOpen(true); 
        }
        
        // db.collection("users").doc(user.email).set(user).then()
    }

    // useEffect(() => {
    //     console.log(user);
    // },[user])
    return (
        <>
        <DialogTitle>Add new admin user</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    After adding the user email and setting up the permission, the user can login and access the admin page with set restrictions !
                </DialogContentText>
                <TextField
                    autoFocus
                    error={user.email == ""}
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setUser(current => {return { ...current, email: event.target.value}}) }
                    sx={{my: 3}}
                />
                <FormControl fullWidth sx={{my: 3}}>
                    <InputLabel id="select-role-id">Role</InputLabel>
                    <Select
                    error={user.role == ""}
                    labelId="select-role-id"
                    value={user.role}
                    id="demo-simple-select"
                    label="Role"
                    onChange={(event) => setUser(current => {return { ...current, role: event.target.value}}) }
                    >
                        <MenuItem value={"admin"}>admin</MenuItem>
                        <MenuItem value={"user"}>user</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                value="can_createuser"
                control={<Checkbox onChange={(event) => setUser(current => {return {...current, can_createuser: event.target.checked}}) }/>}
                label="Create user"
                labelPlacement="start"
                />
                <FormControlLabel
                value="can_createplan"
                control={<Checkbox onChange={(event) => setUser(current => {return {...current, can_createplan: event.target.checked}}) }/>}
                label="Create plan"
                labelPlacement="start"
                />
                <FormControlLabel
                value="can_updateplan"
                control={<Checkbox onChange={(event) => setUser(current => {return {...current, can_updateplan: event.target.checked}}) }/>}
                label="Update plan"
                labelPlacement="start"
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} variant='outlined'>Cancel</Button>
            <LoadingButton loading={isSubmitting} variant='outlined' onClick={submit}>Submit</LoadingButton>
            </DialogActions>
        </>
    )
}

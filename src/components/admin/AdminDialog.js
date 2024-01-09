import { db } from '@/config/firebase';
import { useAppUserContext } from '@/context/AppUserContext';
import { useAppError } from '@/context/ErrorContext';
import { LoadingButton } from '@mui/lab';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

export default function AdminDialog({ handleClose, updateUsers, userObj, setFocusedUser }) {
    const [isSubmitting, setSubmitting] = useState(false);
    const { showMessage } = useAppError();

    const {appUser} = useAppUserContext();

    const [changed, setChanged] = useState(false);

    let currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset())

    const [user, setUser] = useState(!userObj ? {
        email: "",
        role: "",
        can_createuser: false,
        can_createplan: false,
        can_updateplan: false,
        is_setupcompleted: false,
        created_at: "",
        created_by: "",
        updated_by: "",
        updated_at: ""
    }: userObj);

    useEffect(() => {
        if(JSON.stringify(userObj) !== JSON.stringify(user)) setChanged(true);
        else setChanged(false);
    },[userObj, user]);

    const submit = async () => {
        try {
            setSubmitting(true);
            user.created_at = currentDate.toISOString();
            const userRef = doc(db, "users", user.email);
            await setDoc(userRef, user);
            setSubmitting(false);
            await updateUsers();
            handleClose();
            
            setFocusedUser(null);

            showMessage("User created !", "info");
        } catch (error) {
            showMessage(error.message, "error");
        }
        
        // db.collection("users").doc(user.email).set(user).then()
    }

    const update = async () => {
        try {
            setSubmitting(true);
            user.updated_at = currentDate.toISOString();
            user.updated_by = appUser;

            const docRef = doc(db, "users", user.email);
            await updateDoc(docRef, user);

            setSubmitting(false);
            await updateUsers();
            handleClose();

            setFocusedUser(null);

            showMessage("User updated !", "info");
        } catch (error) {
            showMessage(error.message, "error");
        }
    }

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
                    value={user.email}
                    disabled={userObj && true}
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
                control={<Checkbox checked={user.can_createuser} onChange={(event) => setUser(current => {return {...current, can_createuser: event.target.checked}}) }/>}
                label="Create user"
                labelPlacement="start"
                />
                <FormControlLabel
                value="can_createplan"
                control={<Checkbox checked={user.can_createplan} onChange={(event) => setUser(current => {return {...current, can_createplan: event.target.checked}}) }/>}
                label="Create plan"
                labelPlacement="start"
                />
                <FormControlLabel
                value="can_updateplan"
                control={<Checkbox checked={user.can_updateplan} onChange={(event) => setUser(current => {return {...current, can_updateplan: event.target.checked}}) }/>}
                label="Update plan"
                labelPlacement="start"
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} variant='outlined'>Cancel</Button>
            <LoadingButton disabled={!changed} loading={isSubmitting} variant='outlined' onClick={userObj ? update : submit}>{userObj ? "Update" : "Submit"}</LoadingButton>
            </DialogActions>
        </>
    )
}

'use client'
import { Box, Button, Checkbox, Dialog, Grid, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '@/config/AuthContext';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAppError } from '@/context/ErrorContext';
import { redirect } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useDialogContext } from '@/context/DialogContext';
import Users from '@/components/admin/Users';
import AdminDialog from '@/components/admin/AdminDialog';

const getUser = async (email) => {
    const ref = doc(db, "users", email);
    const user = await getDoc(ref);
    if(user.exists()){
        return user.data();
    }
    return false;
}

const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    let docs = [];
    snapshot.forEach(doc => {
        docs.push(doc.data());  
    })
    return docs;
}

export default function Page() {
    const [admin, setAdmin] = useState(null);
    const { user } = UserAuth();
    const {setOpen, setMessage, setSeverity} = useAppError();
    const [menu, setMenu] = useState([]);
    const [currentComponent, setCurrentComponent] = useState(null);

    const [users, setUsers] = useState([]);
    const [plans, setPlans] = useState([]);

    const {open, handleClose, handleClickOpen} = useDialogContext();

    const updateUsers = async () => {
        setUsers(await fetchUsers());
    }
    
    useEffect(() => {
        if(!user) return;
        try {
            getUser(user.email).then(u => {
                if(u){
                    console.log(u);
                    setAdmin(u);
                }else{
                    setMessage("User not found !");
                    setSeverity("error");
                    setOpen(true);
                    redirect("/");
                }
            })    
        } catch (error) {
            setMessage(error.message);
            setSeverity("error");
            setOpen(true);
        }
        
    },[setMessage, setOpen, setSeverity, user]);

    useEffect(() => {
        if(!admin) return;
        let m = [];
        console.log(admin);
        if(admin.role == "superuser"){
            // Add all the pages required
            m.push("Users");
            m.push("Plans");

            // Fetch all the required data
            fetchUsers().then(resp => setUsers(resp));

            // set the menu
            setMenu(m);
        }else{
            // Back checks on other users
            m.push("Plans");

            // Fetch all the required data
            

            // set the menu
            setMenu(m);
        }
    },[admin]);

    useEffect(() => {console.log(menu)},[menu]);

    return (
            <>
            <Toolbar />
            {
                !user ?
                <Box sx={{height: "80vh", justifyContent: "center", alignItems: "center", display:"flex"}}>
                    <Typography variant='h3'>
                        Need to login to view this page !
                    </Typography>
                </Box> : null
            }
            {
                admin ? 
                <Box sx={{display: "flex", flexGrow: 1, height: "85vh", width: "100%"}}>
                    <Grid container gap={1}>
                        <Grid item xs={2} sx={{display: "flex", alignItems:"center", width: "100%", borderRight: "solid 1px", pr: "1%"}}>
                            <Box sx={{width: "100%"}}>
                            {
                                menu.map(m => (
                                    <Button key={m} onClick={() => setCurrentComponent(m)} variant={currentComponent == m ? "contained" : "outlined"} sx={{width: "100%", my: 1}}>
                                        {m}
                                    </Button>
                                ))
                            }
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{display: currentComponent == "Users" ? "block" : "none"}}>
                                {/* Users block */}
                                <Box sx={{display: "flex", justifyContent: "center"}}>
                                    <Users users={users} updateUsers={updateUsers} />
                                </Box>
                                <Box sx={{display: "flex", justifyContent: "center", my: 5}}>
                                    <Button variant='outlined' startIcon={<AdminPanelSettingsIcon />} onClick={handleClickOpen}>
                                        Add Admin User
                                    </Button>
                                </Box>
                                {/* Users block end*/}
                            </Box>
                        </Grid>
                    </Grid>                    
                </Box>
                :null
            }
            <Dialog open={open} onClose={handleClose}>
                <AdminDialog updateUsers={updateUsers} handleClose={handleClose} />
            </Dialog>
            </>
        )
}

'use client'
import { Box, Button, Toolbar } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import React, { useEffect } from 'react'
import { AuthContextProvider, UserAuth } from '@/config/AuthContext';

export default function Page() {
    const { user, googleSignIn, logout } = UserAuth();
    
    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }
    return (
            <>
            <Toolbar />
            <Box sx={{display: "flex", justifyContent: "center", alignItems:"center", height: "80vh"}}>
                <Button startIcon={<GoogleIcon />} variant='outlined' onClick={handleSignIn}>
                    {user ? 'Log Out' : 'Sign In'}
                </Button>
            </Box>
            </>
            
        )
}

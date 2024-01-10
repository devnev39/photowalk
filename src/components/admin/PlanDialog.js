import { LoadingButton } from '@mui/lab';
import { Button, Checkbox, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Map from './Map';
import { useAppError } from '@/context/ErrorContext';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAppUserContext } from '@/context/AppUserContext';
import { planSchema } from '@/models/Plan';

export default function PlanDialog({
    handleClose, updatePlans, planObj, setFocusedPlan
}) {
    const [plan, setPlan] = useState(!planObj ? planSchema : planObj);

    const [isSubmitting, setSubmitting] = useState(false);

    const [changed, setChanged] = useState(false);

    const { appUser } = useAppUserContext();

    const {showMessage} = useAppError();

    let currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset())

    const submit = async () => {
        try {
            setSubmitting(true);
            plan.created_at = currentDate.toISOString();
            plan.created_by = appUser;
            const docRef = doc(db,"plans",plan.name);
            await setDoc(docRef, plan);
            await updatePlans();

            setSubmitting(false);
            handleClose();

            setFocusedPlan(null); // Reset the focusedPlan object

            showMessage("Plan created !", "info");
        } catch (error) {
            showMessage(error.message,"error");
            setSubmitting(false);
        }
    }

    const update = async () => {
        try {
            setSubmitting(true);
            plan.updated_at = currentDate.toISOString();
            plan.updated_by = appUser;
            const docRef = doc(db, "plans", plan.name);
            await updateDoc(docRef, plan);
            await updatePlans();

            setSubmitting(false);
            handleClose();

            setFocusedPlan(null); // Reset the focusedPlan object

            showMessage("Plan updated !", "info");
        } catch (error) {
            showMessage(error.message, "error");
            setSubmitting(false); 
        }
    }

    useEffect(() => {
        if(JSON.stringify(plan) !== JSON.stringify(planObj)) setChanged(true);
        else setChanged(false);
    },[plan, planObj]);

    return (
        <>
        <DialogTitle>
            Create new plan
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Create a new plan by selecting the path in map
            </DialogContentText>
            <TextField 
            autoFocus
            error={plan.name == ""}
            value={plan.name}
            label="Name"
            type='text'
            fullWidth
            variant='standard'
            sx={{my: 3}}
            onChange={(event) => setPlan(current => {return { ...current, name: event.target.value}})}
            />
            <TextField 
            autoFocus
            error={plan.description == ""}
            value={plan.description}
            label="Description"
            type='text'
            fullWidth
            variant='standard'
            sx={{my: 3}}
            onChange={(event) => setPlan(current => {return { ...current, description: event.target.value}})}
            />
            <TextField 
            autoFocus
            error={plan.distance == 0}
            value={plan.distance}
            label="Distance"
            type='number'
            fullWidth
            variant='standard'
            sx={{my: 3}}
            onChange={(event) => setPlan(current => {return { ...current, distance: event.target.value}})}
            />
            <TextField 
            autoFocus
            error={plan.tag == ""}
            value={plan.tag}
            label="Tag"
            type='text'
            fullWidth
            variant='standard'
            sx={{my: 3}}
            onChange={(event) => setPlan(current => {return { ...current, tag: event.target.value}})}
            />
            <TextField 
            autoFocus
            error={plan.plan_datetime == ""}
            // value={plan.plan_datetime ? new Date(plan.plan_datetime) : new Date().toISOString()}
            // value={plan.plan_datetime == "" ? currentDate.toISOString().split(".")[0] : new Date().toISOString().split(".")[0]}
            value={plan.plan_datetime}
            label="Plan Date"
            type='datetime-local'
            fullWidth
            variant='standard'
            sx={{my: 3}}
            onChange={(event) => setPlan(current => {return { ...current, plan_datetime: event.target.value}})}
            />
            <FormControlLabel
            value="is_opeb"
            control={<Checkbox checked={plan.is_open} onChange={(event) => setPlan(current => {return {...current, is_open: event.target.checked}}) }/>}
            label="Open to all"
            labelPlacement="start"
            sx={{my: 3}}
            />
            <Map plan={plan} setPlan={setPlan}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {
                setFocusedPlan(null);
                handleClose();
            }} variant='outlined'>Cancel</Button>
            <LoadingButton disabled={!changed} loading={isSubmitting} variant='outlined' onClick={planObj ? update : submit}>{planObj ? "Update" : "Submit"}</LoadingButton>
        </DialogActions>
        </>
    )
}

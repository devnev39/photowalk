const { Checkbox, IconButton } = require("@mui/material");
import { UserAuth } from '@/config/AuthContext';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAppError } from '@/context/ErrorContext';

const getUserRowId = (row) => {
    return row.email;
}

function RenderCheckBox(props) {
    const [checked, setChecked] = useState(props.value); // Initiated react binded value with param from `rows`
  
    // Handler for user clicks to set checkbox mark or unset it
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    //The bind for dynamic mark/unmark: checked={checked}
    //The handler for user clicks: onChange={handleChange}
    return (
      <Checkbox
        label="some text"
        size="lg"
        checked={checked} 
        onChange={handleChange} 
      />
    );
}

function renderActionButton(props, updateUsers, errorProps) {
    const deleteUser = async () => {
        try {
            await deleteDoc(doc(db, "users", props.row.email));
            await updateUsers();
            errorProps.setMessage("User deleted successfully !");
            errorProps.setSeverity("info");
            errorProps.setOpen(true);
        } catch (error) {
            errorProps.setMessage(error.message);
            errorProps.setSeverity("error");
            errorProps.setOpen(true); 
        }
    }
    return (
        <IconButton onClick={deleteUser}>
            <DeleteIcon />
        </IconButton>
    )
}

export default function Users( {users, updateUsers} ) {
    const { user } = UserAuth();
    const [columns, setColumns] = useState([]);

    const errorProps = useAppError();

    let userColumns = [
        {
            field: 'id' , 
            headerName: '#', 
            filterable: false,
            renderCell:(index) => index.api.getRowIndexRelativeToVisibleRows(index.row.email) + 1,
            width: 50
        },
        {
            field: "email",
            headerName: "Email",
            width: 200
        },
        {
            field: "name",
            headerName: "Name",
            width: 200
        },
        {
            field: "created_at",
            headerName: "Created At",
            width: 200,
            valueGetter: (params) => {
                return new Date(params.row.created_at).toLocaleString()
            }
        },
        {
            field: "role",
            headerName: "Role"
        },
        {
            field: "can_createuser",
            headerName: "can_createuser",
            renderCell: RenderCheckBox
        },
        {
            headerName: "Action",
            renderCell: (props) => renderActionButton(props, updateUsers, errorProps)
        }
    ]

    useEffect(() => {
        if(user && user.role == "superuser"){
            setColumns(userColumns.filter(c => c.headerName != "Action"))
        }else{
            setColumns(userColumns);
        }
    },[user]);
    

    return (
        <DataGrid 
        rows={users}
        columns={columns}
        initialState={{
            pagination: {
            paginationModel: {
                pageSize: 5,
            },
            },
        }}
        pageSizeOptions={[5]}
        getRowId={getUserRowId}
        />
    )
}

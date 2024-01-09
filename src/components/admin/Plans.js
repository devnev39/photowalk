import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    useGridApiContext,
  } from '@mui/x-data-grid';
  
import React, { useEffect } from 'react'
import { Checkbox } from '@mui/material';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAppError } from '@/context/ErrorContext';

function RenderCheckBox(props) {
    return (
      <Checkbox
        label="some text"
        size="lg"
        checked={props.value}
        disabled
      />
    );
}

function RenderCheckBoxEdit(props) {
    const {id, value, field, hasFocus} = props;

    const apiRef = useGridApiContext();

    const handleChange = (event, newValue) => {
        apiRef.current.setEditCellValue({id, field, value: newValue});
    }

    return (
        <Checkbox 
          size='lg'
          checked={value}
          onChange={handleChange}
          name={field}
        />
    )
}

const getRowId = (row) => {
    return row.name;
}

export default function Plans({
    plans, setPlans, openPlanEditDialog, setFocusedPlan
}) {
    const [rowModesModel, setRowModesModel] = React.useState({});

    const {setMessage, setSeverity, setOpen} = useAppError();

    useEffect(() => {
        console.log(plans);
    },[plans]);

    const columns = [
        {
            field: 'id' , 
            headerName: '#', 
            filterable: false,
            renderCell:(index) => index.api.getRowIndexRelativeToVisibleRows(index.row.name) + 1,
            width: 50
        },
        { field: 'name', headerName: 'Name', width: 100, editable: true },
        {
          field: 'description',
          headerName: 'Description',
          type: 'text',
          width: 200,
          align: 'left',
          headerAlign: 'left',
          editable: true,
        },
        {
          field: 'distance',
          headerName: 'Distance',
          type: 'number',
          align: "left",
          width: 100,
          headerAlign: "left",
          editable: true,
        },
        {
          field: 'tag',
          headerName: 'Tag',
          width: 100,
          editable: true,
          type: 'text'
        },
        {
            field: 'is_open',
            headerName: 'Open To All',
            width: 100,
            editable: true,
            type: 'bool',
            renderCell: RenderCheckBox,
            renderEditCell: RenderCheckBoxEdit
        },
        {
            field: "created_at",
            headerName: "Created At",
            type:"date",
            headerAlign: "left",
            align: "left",
            editable: true,
            width: 150,
            valueGetter: (params) => {
                return new Date(params.row.created_at)
            }
        },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            return [
                <GridActionsCellItem
                key={"11"}
                icon={<EditIcon />}
                label="Edit"
                onClick={handleEditClick(id)}
                color="inherit"
                />, 
                <GridActionsCellItem
                    key={"112311"}
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                />,
            ];
          },
        },
      ];
    

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setFocusedPlan(plans.filter((row) => row.name == id)[0]);
        openPlanEditDialog();
    };

    const handleDeleteClick = (id) => async () => {
        try {
            await deleteDoc(doc(db, "plans", id));
            setPlans(plans.filter((row) => row.name !== id));
            setMessage("Plan deleted !");
            setSeverity("info");
            setOpen(true);
        } catch (error) {
            setMessage(error.message);
            setSeverity("error");
            setOpen(true);
        }
        
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = plans.find((row) => row.id === id);
        if (editedRow.isNew) {
        setPlans(plans.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setPlans(plans.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return (
        <DataGrid 
        rows={plans}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar,
        // }}
        getRowId={getRowId}
        slotProps={{
          toolbar: { setPlans, setRowModesModel },
        }}
        />
    )
}

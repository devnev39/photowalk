import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridActionsCellItem,
  useGridApiContext,
} from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAppError } from "@/context/ErrorContext";
import { useAppUserContext } from "@/context/AppUserContext";
import { useConfirmDialogContext } from "@/context/ConfirmDialog";
import { useEffect, useState } from "react";

function RenderCheckBox(props) {
  return (
    <Checkbox label="some text" size="lg" checked={props.value} disabled />
  );
}

function RenderCheckBoxEdit(props) {
  const { id, value, field } = props;

  const apiRef = useGridApiContext();

  const handleChange = (event, newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <Checkbox size="lg" checked={value} onChange={handleChange} name={field} />
  );
}

const getRowId = (row) => {
  return row.name;
};

export default function Plans({
  plans,
  setPlans,
  openPlanEditDialog,
  setFocusedPlan,
}) {
  const { showMessage } = useAppError();

  const { appUser } = useAppUserContext();

  const [deleteId, setDeleteId] = useState(null);

  const ConfirmDialogProps = useConfirmDialogContext();

  const columns = [
    {
      field: "id",
      headerName: "#",
      filterable: false,
      renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(index.row.name) + 1,
      width: 50,
    },
    { field: "name", headerName: "Name", width: 100 },
    {
      field: "description",
      headerName: "Description",
      type: "text",
      width: 200,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "distance",
      headerName: "Distance",
      type: "number",
      align: "left",
      width: 100,
      headerAlign: "left",
    },
    {
      field: "tag",
      headerName: "Tag",
      width: 100,
      type: "text",
    },
    {
      field: "is_open",
      headerName: "Open To All",
      width: 100,
      type: "bool",
      renderCell: RenderCheckBox,
      renderEditCell: RenderCheckBoxEdit,
    },
    {
      field: "plan_datetime",
      headerName: "Plan Date",
      type: "datetime-local",
      headerAlign: "left",
      align: "left",
      width: 250,
      valueGetter: (params) => {
        return new Date(params.row.plan_datetime).toLocaleString();
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
            disabled={!appUser.can_updateplan && appUser.role !== "superuser"}
          />,
          <GridActionsCellItem
            key={id + "1"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            disabled={appUser.role !== "superuser"}
          />,
        ];
      },
    },
  ];

  const handleEditClick = (id) => () => {
    setFocusedPlan(plans.filter((row) => row.name === id)[0]);
    openPlanEditDialog();
  };

  const deleteDocFirebase = async (id) => {
    await deleteDoc(doc(db, "plans", id));
    setPlans(plans.filter((row) => row.name !== id));
    showMessage("Plan deleted !", "info");
  };

  const handleDeleteClick = (id) => async () => {
    try {
      setDeleteId(id);
      ConfirmDialogProps.setDialogTitle(`Delete plan ?`);
      ConfirmDialogProps.setDialogContent(
        `Confirm to delete the plan named : ${id}`,
      );
      ConfirmDialogProps.handleClickOpen();
    } catch (error) {
      showMessage(error.message, "error");
      setDeleteId(null);
    }
  };

  useEffect(() => {
    if (ConfirmDialogProps.confirm) {
      deleteDocFirebase(deleteId);
    }
  }, [ConfirmDialogProps.confirm]);

  return (
    <DataGrid
      rows={plans}
      columns={columns}
      editMode="row"
      getRowId={getRowId}
    />
  );
}

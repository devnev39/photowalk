import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/config/firebase";
import { useAppError } from "@/context/ErrorContext";
import { useConfirmDialogContext } from "@/context/ConfirmDialog";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { Checkbox } from "@mui/material";

const getRowId = (row) => {
  return row.id;
};

function RenderCheckBox(props) {
  const [checked, setChecked] = useState(props.value); // Initiated react binded value with param from `rows`

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  // The bind for dynamic mark/unmark: checked={checked}
  // The handler for user clicks: onChange={handleChange}
  return (
    <Checkbox
      label="some text"
      size="lg"
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default function Images({
  images,
  setImages,
  setFocusedImage,
  openImageEditDialog,
}) {
  const { showMessage } = useAppError();
  const ConfirmDialog = useConfirmDialogContext();

  const [deleteId, setDeleteId] = useState(false);

  const columns = [
    {
      field: "id",
      headerName: "#",
      filterable: false,
      renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
      width: 50,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "show",
      headerName: "Show",
      renderCell: RenderCheckBox,
    },
    {
      field: "uploaded_at",
      headerName: "Uploaded At",
      width: 200,
      valueGetter: (params) => {
        return new Date(params.row.uploaded_at).toLocaleString();
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
          />,
          <GridActionsCellItem
            key={id + "1"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const deleteDocFirebase = async (id) => {
    await deleteDoc(doc(db, "images", id));
    const img = images.filter((row) => row.id === id)[0];
    setImages(images.filter((row) => row.id !== id));
    if (img.path === "") throw new Error("Path not found !");
    const imgRef = ref(storage, img.path);
    deleteObject(imgRef)
      .then(() => {
        showMessage("Image deleted !", "info");
      })
      .catch((err) => {
        showMessage(err.message, "error");
      });
    setDeleteId(null);
  };

  const handleEditClick = (id) => () => {
    setFocusedImage(images.filter((row) => row.id === id)[0]);
    openImageEditDialog();
  };

  const handleDeleteClick = (id) => () => {
    try {
      setDeleteId(id);
      ConfirmDialog.setCurrent("Images");
      ConfirmDialog.setDialogTitle("Delete image ?");
      ConfirmDialog.setDialogContent(`Confirm to delete image: ${id}`);
      ConfirmDialog.handleClickOpen();
    } catch (error) {
      showMessage(error.message, "error");
      setDeleteId(null);
    }
  };

  useEffect(() => {
    if (ConfirmDialog.confirm && ConfirmDialog.current === "Images") {
      try {
        deleteDocFirebase(deleteId);
      } catch (error) {
        showMessage(error.message, "error");
      }
    }
  }, [ConfirmDialog.confirm]);

  return <DataGrid rows={images} columns={columns} getRowId={getRowId} />;
}

/* eslint-disable object-shorthand */
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppError } from "@/context/ErrorContext";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function PlanImageUploadDialog({
  handleClose,
  updatePlans,
  planObj,
  setFocusedPlan,
}) {
  const plan = planObj;
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  //   const uploadImage = async () => {

  //   };

  const { showMessage } = useAppError();

  const handleAddImage = async () => {
    if (!file && !description) {
      showMessage("Image file or description missing !", "error");
      return;
    }
    try {
      setIsUploading(true);
      const fileRef = ref(storage, `data/plan_images/${file.name}`);
      uploadBytes(fileRef, file).then((snapshot) => {
        setIsUploading(false);
        showMessage("File uploaded !", "info");
        getDownloadURL(snapshot.ref).then(async (downloadUrl) => {
          showMessage("Public url created !", "info");
          // setPlan((current) => {
          //     return {...current, planImages: [
          //         ...current.planImages,
          //         {
          //             path: `data/plan_images/${file.name}`,
          //             url: downloadUrl,
          //             description: description
          //         }
          //     ]}
          // })
          plan.planImages.push({
            path: `data/plan_images/${file.name}`,
            url: downloadUrl,
            description: description,
            name: file.name,
          });
          const docRef = doc(db, "plans", plan.name);
          await updateDoc(docRef, plan);
          await updatePlans();

          setIsUploading(false);
          showMessage("Plan image list updated !", "info");
        });
      });
    } catch (error) {
      showMessage(error.message, "error");
      setIsUploading(false);
    } finally {
      setFile(null);
      setDescription("");
    }
  };

  const cancelImageUpload = () => {
    setFocusedPlan(null);
    handleClose();
  };

  const handleDeleteImage = async (path) => {
    try {
      const toDelete = plan.planImages.filter((img) => img.path === path)[0];
      const fileRef = ref(storage, toDelete.path);
      deleteObject(fileRef)
        .then(() => {
          showMessage("Image deleted !", "info");
        })
        .catch((err) => {
          showMessage(err.message, "error");
        });
      plan.planImages = plan.planImages.filter((img) => img.path !== path);
      const docRef = doc(db, "plans", plan.name);
      await updateDoc(docRef, plan);
      showMessage("Plan updated !", "info");
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  return (
    <>
      <DialogTitle>Upload images for plan</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Upload images for plan ${planObj.name}`}
        </DialogContentText>
        <FormControlLabel
          control={
            <Button
              sx={{ mr: 2 }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                accept="image/png, image/jpeg"
                onChange={(event) => {
                  if (event.target.files.length) {
                    setFile(event.target.files[0]);
                  }
                }}
              />
            </Button>
          }
          label={file ? file.name : ""}
          labelPlacement="end"
        />
        <TextField
          autoFocus
          required
          value={description}
          margin="dense"
          name="description"
          label="Description"
          variant="standard"
          onChange={(e) => setDescription(e.target.value)}
        />
        {plan
          ? plan.planImages
            ? plan.planImages.map((image) => (
                <Grid
                  container
                  gap={2}
                  key={image.name}
                  sx={{
                    my: "1rem",
                    borderRadius: "5px",
                    borderColor: "black",
                    border: 1,
                    padding: "0.5rem",
                  }}
                >
                  <Grid xs={3} item>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {image.name}
                    </Typography>
                  </Grid>
                  <Grid xs={6} item>
                    <Typography>{image.description}</Typography>
                  </Grid>
                  <Grid xs={1} item>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteImage(image.path)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))
            : null
          : null}
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={!file}
          loading={isUploading}
          variant="outlined"
          color="primary"
          onClick={handleAddImage}
        >
          Upload Image
        </LoadingButton>
        <Button variant="outlined" color="error" onClick={cancelImageUpload}>
          Close
        </Button>
      </DialogActions>
    </>
  );
}

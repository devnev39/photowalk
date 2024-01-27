import { db, storage } from "@/config/firebase";
import { useAppUserContext } from "@/context/AppUserContext";
import { useAppError } from "@/context/ErrorContext";
import { imageSchema } from "@/models/Image";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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

export default function ImageDialog({
  updateImages,
  imageObj,
  setFocusedImage,
  handleClose,
}) {
  const [image, setImage] = useState(!imageObj ? imageSchema : imageObj);
  const [imageUploaded, setImageUploaded] = useState(false);

  const [file, setFile] = useState(null);

  const [isSubmitting, setSubmitting] = useState(false);

  const [changed, setChanged] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const { appUser } = useAppUserContext();

  const { showMessage } = useAppError();

  const currentDate = new Date();
  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset(),
  );

  useEffect(() => {
    if (JSON.stringify(image) !== JSON.stringify(imageObj)) setChanged(true);
    else setChanged(false);
  }, [imageObj, image]);

  const update = async () => {
    try {
      setSubmitting(true);
      image.updated_by = appUser;
      image.updated_at = currentDate.toISOString();

      const imgRef = doc(db, "images", image.id);
      await updateDoc(imgRef, image);
      setSubmitting(false);

      await updateImages();
      handleClose();

      showMessage("Image updated !", "info");
    } catch (error) {
      showMessage(error.message, "error");
      setSubmitting(false);
    }
  };

  const submit = async () => {
    try {
      setSubmitting(true);
      image.uploaded_by = appUser;
      image.uploaded_at = currentDate.toISOString();
      image.id = uuidv4().replaceAll("-", "");
      if (image.url === "") throw new Error("Image url not found !");
      const imgRef = doc(db, "images", image.id);
      await setDoc(imgRef, image);
      setSubmitting(false);
      await updateImages();
      setFocusedImage(null);
      handleClose();
      showMessage("Image created !", "info");
    } catch (error) {
      showMessage(error.message, "error");
      setSubmitting(false);
    }
  };

  const deleteUploadedImage = async () => {
    if (!image || !image.path) {
      showMessage("Image or Image url not found !", "info");
      return;
    }
    const fileRef = ref(storage, image.path);
    deleteObject(fileRef)
      .then(() => {
        showMessage("Image deleted !", "info");
      })
      .catch((err) => {
        showMessage(err.message, "error");
      });
  };

  const uploadImage = async () => {
    try {
      setIsUploading(true);
      const fileRef = ref(storage, `data/image/${file.name}`);
      uploadBytes(fileRef, file).then((snapshot) => {
        setIsUploading(false);
        showMessage("File uploaded !", "info");
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          showMessage("Public url created !", "info");
          setImageUploaded(true);
          setImage((prev) => {
            return {
              ...prev,
              url: downloadUrl,
              path: `data/image/${file.name}`,
            };
          });
        });
      });
    } catch (error) {
      showMessage(error.message, "error");
      setIsUploading(false);
    }
  };

  return (
    <>
      <DialogTitle>Add new images</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Upload images with location information and additionoal info. Add
          correct grid section names to group images in same sections of front
          page.
        </DialogContentText>
        <TextField
          autoFocus
          error={image.location === ""}
          value={image.location}
          margin="dense"
          id="location"
          label="Location"
          type="text"
          fullWidth
          variant="standard"
          onChange={(event) =>
            setImage((current) => {
              return { ...current, location: event.target.value };
            })
          }
          sx={{ my: 3 }}
        />
        <TextField
          autoFocus
          // error={image.descropti === ""}
          value={image.grid_section}
          margin="dense"
          id="grid_section"
          label="Grid Section"
          type="text"
          fullWidth
          variant="standard"
          onChange={(event) =>
            setImage((current) => {
              return { ...current, grid_section: event.target.value };
            })
          }
          sx={{ my: 3 }}
        />
        <TextField
          autoFocus
          // error={image.descropti === ""}
          value={image.description}
          margin="dense"
          id="Description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          onChange={(event) =>
            setImage((current) => {
              return { ...current, description: event.target.value };
            })
          }
          sx={{ my: 3 }}
        />
        <FormControlLabel
          value="show"
          control={
            <Checkbox
              checked={image.show}
              onChange={(event) =>
                setImage((current) => {
                  return { ...current, show: event.target.checked };
                })
              }
            />
          }
          label="Show"
          labelPlacement="start"
        />
        <br></br>
        {imageObj ? (
          <>
            <Box component="img" sx={{ height: 300 }} src={imageObj.url} />
          </>
        ) : (
          <>
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
            <LoadingButton
              disabled={!file}
              loading={isUploading}
              variant="outlined"
              onClick={uploadImage}
            >
              Upload Image
            </LoadingButton>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (imageUploaded) deleteUploadedImage();
            setFocusedImage(null);
            handleClose();
          }}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
        <LoadingButton
          disabled={!changed}
          loading={isSubmitting}
          variant="outlined"
          onClick={imageObj ? update : submit}
        >
          {imageObj ? "Update" : "Submit"}
        </LoadingButton>
      </DialogActions>
    </>
  );
}

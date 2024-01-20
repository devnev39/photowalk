"use client";
import { Box, Button, Dialog, Grid, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UserAuth } from "@/config/AuthContext";
import { useAppError } from "@/context/ErrorContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useDialogContext } from "@/context/DialogContext";
import Users from "@/components/admin/Users";
import AdminDialog from "@/components/admin/AdminDialog";
import HikingIcon from "@mui/icons-material/Hiking";
import PlanDialog from "@/components/admin/PlanDialog";
import Plans from "@/components/admin/Plans";
import { useAppUserContext } from "@/context/AppUserContext";
import { fetchDocsCollection, getUser, updateUser } from "@/api/store";

export default function Page() {
  const [admin, setAdmin] = useState(null);
  const { user, logout } = UserAuth();
  const { setOpen, setMessage, setSeverity } = useAppError();
  const [menu, setMenu] = useState([]);
  const [currentComponent, setCurrentComponent] = useState(null);

  const [focusedPlan, setFocusedPlan] = useState(null);
  const [focusedUser, setFocusedUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);

  const { open, handleClose, handleClickOpen, dialog } = useDialogContext();

  const { setAppUser } = useAppUserContext();

  const updateUsers = async () => {
    setUsers(await fetchDocsCollection("users"));
  };

  const updatePlans = async () => {
    setPlans(await fetchDocsCollection("plans"));
  };

  useEffect(() => {
    if (!user) return;
    try {
      getUser(user.email).then((u) => {
        if (u) {
          console.log(u);
          setAdmin(u);
        } else {
          setMessage("User not found ! Logging out !");
          setSeverity("error");
          setOpen(true);
          logout();
        }
      });
    } catch (error) {
      setMessage(error.message);
      setSeverity("error");
      setOpen(true);
    }
  }, [logout, setMessage, setOpen, setSeverity, user]);

  useEffect(() => {
    if (!admin) return;
    const m = [];
    console.log(admin);
    if (admin.role === "superuser") {
      // Add all the pages required
      m.push("Users");
      m.push("Plans");

      // Fetch all the required data
      fetchDocsCollection("users").then((resp) => setUsers(resp));
      fetchDocsCollection("plans").then((resp) => setPlans(resp));

      // set the menu
      setMenu(m);
    } else {
      // Back checks on other users
      m.push("Plans");

      // Fetch all the required data
      fetchDocsCollection("plans").then((resp) => setPlans(resp));

      // set the menu
      setMenu(m);
    }
  }, [admin]);

  useEffect(() => {
    // This effect checks if user has completed the setup or not !
    // Check the is_setupcompleted flag, if false then copy info required to db
    if (!admin) return;
    if (!admin.is_setupcompleted) {
      updateUser({ ...admin, name: user.displayName, is_setupcompleted: true });
      setMessage("Updating user !");
      setSeverity("info");
      setOpen(true);
    }
    setAppUser(admin);
  }, [admin]);

  return (
    <>
      <Toolbar />
      {!user ? (
        <Box
          sx={{
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography variant="h3">
            Need to login to view this page !
          </Typography>
        </Box>
      ) : null}
      {admin ? (
        <Box
          sx={{ display: "flex", flexGrow: 1, height: "85vh", width: "100%" }}
        >
          <Grid container gap={1}>
            <Grid
              item
              xs={2}
              sx={{ width: "100%", borderRight: "solid 1px", pr: "1%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box>
                  <Typography variant="h5">Welcome {admin.name} !</Typography>
                  <Typography>{admin.email}</Typography>
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <Box sx={{ width: "100%" }}>
                  {menu.map((m) => (
                    <Button
                      key={m}
                      onClick={() => setCurrentComponent(m)}
                      variant={
                        currentComponent === m ? "contained" : "outlined"
                      }
                      sx={{ width: "100%", my: 1 }}
                    >
                      {m}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box
                sx={{
                  display: currentComponent === "Users" ? "block" : "none",
                }}
              >
                {/* Users block */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Users
                    users={users}
                    updateUsers={updateUsers}
                    openUserEditDialog={() => handleClickOpen("adminDialog")}
                    setFocusedUser={setFocusedUser}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AdminPanelSettingsIcon />}
                    onClick={() => handleClickOpen("adminDialog")}
                  >
                    Add Admin User
                  </Button>
                </Box>
                {/* Users block end */}
              </Box>
              <Box
                sx={{
                  display: currentComponent === "Plans" ? "block" : "none",
                }}
              >
                {/* Plans block */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Plans
                    setFocusedPlan={setFocusedPlan}
                    openPlanEditDialog={() => handleClickOpen("planDialog")}
                    plans={plans}
                    setPlans={setPlans}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                  <Button
                    disabled={
                      !admin.can_createplan && admin.role !== "superuser"
                    }
                    variant="outlined"
                    startIcon={<HikingIcon />}
                    onClick={() => handleClickOpen("planDialog")}
                  >
                    Add Plan
                  </Button>
                </Box>
                {/* Plans block end */}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}
      <Dialog open={open && dialog === "adminDialog"} onClose={handleClose}>
        <AdminDialog
          setFocusedUser={setFocusedUser}
          userObj={focusedUser}
          updateUsers={updateUsers}
          handleClose={handleClose}
        />
      </Dialog>
      <Dialog open={open && dialog === "planDialog"} onClose={handleClose}>
        <PlanDialog
          updatePlans={updatePlans}
          planObj={focusedPlan}
          setFocusedPlan={setFocusedPlan}
          handleClose={handleClose}
        />
      </Dialog>
    </>
  );
}

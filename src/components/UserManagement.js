import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  makeStyles,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { userService } from "../services";

const useStyles = makeStyles({
  container: {
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  statsContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  statCard: {
    padding: "20px",
    flex: "1",
    minWidth: "200px",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  table: {
    minWidth: 650,
  },
  adminChip: {
    backgroundColor: "#ff9800",
    color: "white",
  },
  userChip: {
    backgroundColor: "#2196f3",
    color: "white",
  },
  activeChip: {
    backgroundColor: "#4caf50",
    color: "white",
  },
  inactiveChip: {
    backgroundColor: "#f44336",
    color: "white",
  },
});

function UserManagement() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersResponse, statsResponse] = await Promise.all([
        userService.getAll(),
        userService.getStats(),
      ]);

      if (usersResponse.success) {
        setUsers(usersResponse.users);
      }

      if (statsResponse.success) {
        setStats(statsResponse.stats);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch users: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await userService.updateRole(userId, newRole);
      if (response.success) {
        alert(`User role updated to ${newRole}`);
        fetchData();
      }
    } catch (error) {
      alert("Failed to update role: " + error.message);
    }
    setDialogOpen(false);
  };

  const handleToggleStatus = async (userId) => {
    try {
      const response = await userService.toggleStatus(userId);
      if (response.success) {
        alert(response.message);
        fetchData();
      }
    } catch (error) {
      alert("Failed to toggle status: " + error.message);
    }
    setDialogOpen(false);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await userService.deleteUser(userId);
      if (response.success) {
        alert("User deleted successfully");
        fetchData();
      }
    } catch (error) {
      alert("Failed to delete user: " + error.message);
    }
    setDialogOpen(false);
  };

  const openDialog = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.header}>
        <h1>User Management</h1>
      </Grid>

      {stats && (
        <Grid item xs={12} className={classes.statsContainer}>
          <div className={classes.statCard}>
            <h3>{stats.total}</h3>
            <p>Total Users</p>
          </div>
          <div className={classes.statCard}>
            <h3>{stats.admins}</h3>
            <p>Admins</p>
          </div>
          <div className={classes.statCard}>
            <h3>{stats.users}</h3>
            <p>Regular Users</p>
          </div>
          <div className={classes.statCard}>
            <h3>{stats.active}</h3>
            <p>Active</p>
          </div>
          <div className={classes.statCard}>
            <h3>{stats.inactive}</h3>
            <p>Inactive</p>
          </div>
        </Grid>
      )}

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Joined</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role.toUpperCase()}
                      className={
                        user.role === "admin"
                          ? classes.adminChip
                          : classes.userChip
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isActive ? "Active" : "Inactive"}
                      className={
                        user.isActive
                          ? classes.activeChip
                          : classes.inactiveChip
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        openDialog(
                          user,
                          user.role === "admin" ? "demote" : "promote"
                        )
                      }
                      style={{ marginRight: "5px" }}
                    >
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => openDialog(user, "toggle")}
                      style={{ marginRight: "5px" }}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => openDialog(user, "delete")}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          {actionType === "promote" && (
            <p>
              Make <strong>{selectedUser?.name}</strong> an admin?
            </p>
          )}
          {actionType === "demote" && (
            <p>
              Remove admin role from <strong>{selectedUser?.name}</strong>?
            </p>
          )}
          {actionType === "toggle" && (
            <p>
              {selectedUser?.isActive ? "Deactivate" : "Activate"}{" "}
              <strong>{selectedUser?.name}</strong>?
            </p>
          )}
          {actionType === "delete" && (
            <p>
              Delete user <strong>{selectedUser?.name}</strong>? This action
              cannot be undone.
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (actionType === "promote") {
                handleRoleChange(selectedUser._id, "admin");
              } else if (actionType === "demote") {
                handleRoleChange(selectedUser._id, "user");
              } else if (actionType === "toggle") {
                handleToggleStatus(selectedUser._id);
              } else if (actionType === "delete") {
                handleDeleteUser(selectedUser._id);
              }
            }}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default UserManagement;

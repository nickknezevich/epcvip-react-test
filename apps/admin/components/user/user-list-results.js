import { useReducer, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Button,
  ButtonGroup,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/router';
import _ from 'lodash';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useUsers } from '../../store/context/user-context';
import EditIcon from '@mui/icons-material/Edit';
import { PropaneSharp } from '@mui/icons-material';

export const UserListResults = ({ users, handleDeleteUser, handleEditUser, ...rest }) => {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const { dispatch } = useUsers();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteSelectedUsers = () => {
    handleClose();
    deleteMultipleUsers();
  };
  const router = useRouter();

  const addUser = () => {
    router.push('/users/add');
  };

  const getInitials = (name = '') =>
    name
      .replace(/\s+/, ' ')
      .split(' ')
      .slice(0, 2)
      .map((v) => v && v[0].toUpperCase())
      .join('');

  const handleSelectAll = (event) => {
    let newSelectedUserIds;

    if (event.target.checked) {
      newSelectedUserIds = users.map((User) => User.id);
    } else {
      newSelectedUserIds = [];
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUserIds.indexOf(id);
    let newSelectedUserIds = [];

    if (selectedIndex === -1) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds, id);
    } else if (selectedIndex === 0) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(1));
    } else if (selectedIndex === selectedUserIds.length - 1) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(0, selectedIndex),
        selectedUserIds.slice(selectedIndex + 1)
      );
    }
    setSelectedUserIds(newSelectedUserIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteMultipleUsers = () => {
    selectedUserIds.forEach((id) => {
      users.splice(_.findIndex(users, { id: id }), 1);
    });
  };

  const handleBeforeDeleteUser = id => {
    setUserToDelete(id)
    setDeleteDialogOpen(true)
  }

  const deleteUser = () => {
    handleDeleteUser(userToDelete)
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  return (
    <>
      <Card {...rest}>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete selected user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click 'continue' to delete selected user. You can't undo the operation. User will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={deleteUser} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUserIds.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUserIds.length > 0 &&
                        selectedUserIds.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * limit, page * limit + 5).map((User) => (
                  <TableRow
                    hover
                    key={User.id}
                    selected={selectedUserIds.indexOf(User.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUserIds.indexOf(User.id) !== -1}
                        onChange={(event) => handleSelectOne(event, User.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Avatar src={User.avatarUrl} sx={{ mr: 2 }}>
                          {getInitials(User.first_name + ' ' + User.last_name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {User.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{User.email}</TableCell>
                    <TableCell>{User.first_name}</TableCell>
                    <TableCell>{User.last_name}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => handleBeforeDeleteUser(User.id)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <IconButton
                        aria-label="edit"
                        onClick={(e) => handleEditUser(User)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={users.length === -1 ? 0 : users.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </Card>
    </>
  );
};

UserListResults.propTypes = {
  users: PropTypes.array.isRequired,
};

import Head from 'next/head';
import { useReducer, useEffect, useState, useRef } from 'react';
import { Box, Container } from '@mui/material';
import { UserListResults } from '../components/user/user-list-results';
import { UserListToolbar } from '../components/user/user-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useUsers } from '../store/context/user-context';
import { fetchUsers } from '../api/users';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import UserForm from '../components/user/user-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography } from '@mui/material';
import { deleteUser } from '../api/users';

const Users = () => {
  const { users, dispatch } = useUsers();
  const [user, setUser] = useState()
  const [userFormDialogVisible, setUserFormDialogVisible] = useState(false);
  const [userFormDialogMode, setUserFormDialogMode] = useState('add');
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
  const userFormRef = useRef(UserForm);

  useEffect(() => {
    console.info('fetching users');
    fetchUsers()
      .then((response) => {
        dispatch({
          type: 'ADD_USERS',
          payload: response.data.data,
        });
        console.info('users fetched');
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(users);
  }, []);

  function handleDeleteUser(id: number) {
    deleteUser(id)
      .then((responseData) => {
        console.log(responseData);
        dispatch({
          type: 'DELETE_USER',
          payload: id,
        });
        
      })
      .catch((e) => {
        //formik.setErrors({invalidLogin: e.message });
      });
    console.log('User `${id}` deleted');
  }

  const handleAddUser = () => {
    setUserFormDialogVisible(true)
    setUserFormDialogMode('add')
    setUser(undefined)
  };

  const handleEditUser = (User: any) => {
    setUserFormDialogVisible(true)
    setUserFormDialogMode('edit')
    setUser(User)
  }

  const handleCloseUserForm = () => {
    setUserFormDialogVisible(false)
  }

  return (
    <>
      <Head>
        <title>Users | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {/* <UserListToolbar /> */}
          <UserForm mode={userFormDialogMode} open={userFormDialogVisible} onClose={handleCloseUserForm}  user={user?user:undefined}></UserForm>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              m: -1,
              mb: 2,
            }}
          >
            <Typography sx={{ m: 1 }} variant="h4">
              Users
            </Typography>
            <Box sx={{ m: 1 }}>
              <Button
                variant="contained"
                onClick={handleAddUser}
                endIcon={<AddCircleIcon />}
                color="success"
              >
                Add User
              </Button>
            </Box>
          </Box>
          <UserListResults users={users} handleDeleteUser={handleDeleteUser} handleEditUser={handleEditUser} />
        </Container>
      </Box>
    </>
  );
};
Users.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Users;

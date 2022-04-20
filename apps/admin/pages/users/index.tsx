import Head from 'next/head';
import { useReducer, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { UserListResults } from '../../components/user/user-list-results-reqres';
import { UserListToolbar } from '../../components/user/user-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { reducer, initialState } from '../../store/reducer/userReducer';
import { users } from '../../components/user/users-mock';
import { fetchUsers } from '../../api/users';

const Users = () => {
  const [ {users}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    
    console.log('fetching users')

    fetchUsers().then((response) => {
      dispatch({
        type: 'ADD_USERS',
        payload: response.data
      })
      console.log(response)
      console.log('users fetched')
    }).catch((e) => {
      console.log(e)
    });
    
  }, []);

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
          <Box sx={{ mt: 3 }}>
            <UserListResults users={users} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Users.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Users;

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardLayout } from '../../components/dashboard-layout';
import { addUser } from '../../api/users';
import { useReducer, useState } from 'react';
import { reducer, initialState } from '../../store/reducer/userReducer';
import { Alert } from '@mui/material';
import { StateProvider } from 'apps/admin/store/StateProvider';


const AddUser = () => {
  const [ {users}, dispatch] = useReducer(reducer, initialState);
  console.log('users:', users)
  const [userAdded, setUserAdded] = useState(0);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required(
          'First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Last name is required')
    }),
    onSubmit: () => {
      // executePostRequest("https://reqres.in/api/users", formik.values)
      // .then((response: any) => {
      //   console.log(response.data)
      // })
      // .catch((error: any) => {
      //  //throw Error("Email or username not valid!");
      // });

      addUser(formik.values).then((responseData)=>{
        formik.setSubmitting(false)
        dispatch({
          type: 'ADD_USERS',
          payload: responseData
        })
        setUserAdded(1);
        console.log(users)
       }).catch((e)=>{
        formik.setSubmitting(false)

        //formik.setErrors({invalidLogin: e.message });
       });
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/users"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Users
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
          <Box
              sx={{
                pb: 1,
                pt: 1
              }}
            >
              {userAdded ? (
             <Alert severity="success">New User successfully added!</Alert>
            ) : null}
            </Box>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Add a new User
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new user
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="First Name"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Last Name"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
          
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Add User
              </Button>
            </Box>
           
          </form>
        </Container>
      </Box>
    </>
  );
};



AddUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddUser;
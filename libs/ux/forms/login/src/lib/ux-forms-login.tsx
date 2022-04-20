import styles from './ux-forms-login.module.css';

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Auth from '@epcvip-react-test/auth';
import { Alert } from '@mui/material';
import { emit } from 'process';

/* eslint-disable-next-line */
export interface UxFormsLoginProps {}

export function UxFormsLogin(props: UxFormsLoginProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: 'nilson@email.com',
      password: '12345',
      invalidLogin: null
    },
    
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      Auth.login(formik.values.email,formik.values.password).then((response)=>{
        formik.setSubmitting(false)
        router.push('/')
       }).catch((e)=>{
        formik.setSubmitting(false)
        formik.setErrors({invalidLogin: e.message });
       });
      
    }
    
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
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
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 1
              }}
            >
              {formik.errors.invalidLogin ? (
             <Alert severity="error">Invalid credentials.</Alert>
            ) : null}
            </Box>

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
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
              >
                Sign In 
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
}

export default UxFormsLogin;

import { AppProps } from 'next/app';

import React, { useState, useEffect, useReducer } from "react";
import Head from 'next/head';
import './styles.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';
import { CssBaseline } from '@mui/material';
import { useRouter } from 'next/router';
import { getCurrentUser, authHeader, logout } from '@epcvip-react-test/auth';
import _ from 'lodash';   
import { UxFormsLogin }  from '@epcvip-react-test/ux/forms/login';
import { useStateValue, StateProvider } from '../store/StateProvider'
import  { reducer, initialState } from '../store/reducer/userReducer'
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
import { RouteGuard } from '../components/route-guard';

const App = (props) => {

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [state, dispatch] = useReducer(reducer, initialState);
  const ISSERVER = typeof window === "undefined";
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <title>
          Material Kit Pro
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <StateProvider initialState={initialState} reducer={reducer}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouteGuard> 
          {getLayout(<Component {...pageProps} />)}
          </RouteGuard>
        </ThemeProvider>
      </StateProvider>
    </>
  );
};

export default App;

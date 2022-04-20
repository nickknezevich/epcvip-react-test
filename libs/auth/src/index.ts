export * from './lib/auth';

import * as _ from 'lodash';   
import { NextRouter } from 'next/router';

import { executePostRequest, executeSyncPostRequest } from '@epcvip-react-test/connector';

const DEFAULT_AUTH_URL = 'http://localhost:8090';

const login = (email: string, password: string) => {
    return executePostRequest(DEFAULT_AUTH_URL+"/auth/login", {
        email,
        password,
      },
     )
      .then((response: any) => {
        if (response.data && response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error: any) => {
       throw Error("Email or username not valid!");
      });
  };

  export const logout = () => {
    localStorage.removeItem("user");
  };

  export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user") || '{}');
  };

  export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!_.isEmpty(user) && user.access_token) {
      return { Authorization: 'Bearer ' + user.access_token };
    } else {
      return {};
    }
  }

  export default {
    login,
    logout,
    getCurrentUser,
    authHeader
  };

  import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
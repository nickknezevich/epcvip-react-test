export * from './lib/connector';

import Axios from "axios";

//const API_BASE_URL = process.env.APP_API_URL
const API_BASE_URL = 'https://reqres.in/api'

export const connector = Axios.create({
    baseURL: "http://127.0.0.1:3035/api/",
    headers: {
    }
  });
  
  connector.interceptors.request.use((config) => {
    config.params = config.params || {};
  //   config.params['version'] = '1.0';
  //   config.params['api_key'] = '0000';
    return config;
  });

//   connector.interceptors.response.use(response => {
//     return response;
//   }, error => {
//     if (error.response.status === 401) {
//     }
//     console.log(error)
//     return error;
//  });
  
  export const executeGetRequest = async (endpoint: string, params: any) => {
    return connector.get(endpoint, {params: params})
  };
  
  export const executePostRequest = async (endpoint: string, payload: any) => {
    return connector.post(endpoint, payload);
  }

  export const submitPostRequest = (
    endpoint: string,
    payload: any = {},
    absolute: boolean = false
  ) => {
    //dispatch(enableLoading())
  
    return connector
      .post(absolute === true ? endpoint : API_BASE_URL + endpoint, payload)
      .then(data => {
        //dispatch(disableLoading())
        return Promise.resolve(data)
      })
      .catch(error => {
        //dispatch(disableLoading())
        // if (_.has(error.response, 'status')) {
        //   Toasts.showError(errorMessage(error.response.status))
        // }
        return Promise.reject(error)
      })
  }

  export const submitPutRequest = (
    endpoint: string,
    payload: any = {},
    absolute: boolean = false
  ) => {
    //dispatch(enableLoading())
  
    return connector
      .put(absolute === true ? endpoint : API_BASE_URL + endpoint, payload)
      .then(data => {
        //dispatch(disableLoading())
        return Promise.resolve(data)
      })
      .catch(error => {
        //dispatch(disableLoading())
        // if (_.has(error.response, 'status')) {
        //   Toasts.showError(errorMessage(error.response.status))
        // }
        return Promise.reject(error)
      })
  }

  export const submitDeleteRequest = (
    endpoint: string,
    payload: any = {},
    absolute: boolean = false
  ) => {
    //dispatch(enableLoading())
  
    return connector
      .delete(absolute === true ? endpoint : API_BASE_URL + endpoint, payload)
      .then(data => {
        //dispatch(disableLoading())
        return Promise.resolve(data)
      })
      .catch(error => {
        //dispatch(disableLoading())
        // if (_.has(error.response, 'status')) {
        //   Toasts.showError(errorMessage(error.response.status))
        // }
        return Promise.reject(error)
      })
  }

  export const executeSyncPostRequest = (endpoint: string, payload: any) => {
    return connector.post(endpoint, payload);
  }
  
  export const executeDeleteRequest = async (endpoint: string) => {
    return connector.post(endpoint, {})
  };

  export default {
    connector,
    executeGetRequest,
    executePostRequest,
    executeSyncPostRequest,
    executeDeleteRequest
  };

import { executeGetRequest, executePostRequest, submitPostRequest, submitPutRequest, submitDeleteRequest } from "@epcvip-react-test/connector";

const USERS_API_URL = 'https://reqres.in/api'

export const addUser = (values) => {
  return submitPostRequest(USERS_API_URL+'/users', values, true)
      .catch((error: any) => {
       throw Error(error);
      });      
}

export const updateUser = (values) => {
  return submitPutRequest(USERS_API_URL+'/users', values, true)
      .catch((error: any) => {
       throw Error(error);
      });      
}

export const deleteUser = (id: number) => {
  return submitDeleteRequest(USERS_API_URL+'/users/', id, true)
      .catch((error: any) => {
       throw Error(error);
      });      
}

export const fetchUsers = async () => {
    return executeGetRequest(USERS_API_URL+'/users?page=1&per_page=20',{});
  };

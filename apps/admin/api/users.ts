import { executeGetRequest, executePostRequest } from "@epcvip-react-test/connector";

const USERS_API_URL = 'https://reqres.in/api'

export const addUser =  async (values) => {
  executePostRequest(USERS_API_URL+'/api/users', values)
      .then((response: any) => {
        
        return response.data.data
      })
      .catch((error: any) => {
       throw Error(error);
      });
}
export const fetchUsers = async () => {
    return executeGetRequest(USERS_API_URL+'/users?page=1&per_page=10',{});
  };

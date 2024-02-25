import { myAxios, privateAxios } from "./helper";

export const SignUp=async (user)=>{
    const response = await myAxios
        .post('/api/v1/users/register', user);
    return response.data;
}
export const UserLogin=async (loginDetails)=>{
    const response = await myAxios
        .post('/api/v1/users/login', loginDetails,{ timeout: 10000 });
    return response.data;
}
export const UserExpense = async (userexpense) => {
    const response = await 
    privateAxios.post(`/api/v1/users/expense/addexpense`,userexpense,{ timeout: 10000 });
    return response;
}
export const GetAllUserExpense = async () => {
    const response = await 
    privateAxios.get(`/api/v1/users/expense/getExpense`,{ timeout: 10000 });
    return response.data;
}
import { myAxios } from "./helper";

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
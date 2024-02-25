import { privateAxios } from "./helper";
export const GetAllUserProducts = async () => {
    const response = await privateAxios.get(`/api/v1/users/expense/getUserProducts`);
    return response.data;
}
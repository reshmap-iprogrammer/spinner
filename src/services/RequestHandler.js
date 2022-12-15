import axios from "axios";
import { route } from "./ApiRoutes";

export const getRequestData = async (route, params = null) => {
    try {
      const response = await axios.get(route);
      console.log('objecteews', response)
      return response;
    } catch (error) {
      if (
        error?.response?.data?.statusCode == 400 ||
        error?.response?.data?.statusCode == 422 ||
        error?.response?.data?.statusCode == 500
      ) {
        return error?.response?.data;
      }
      return error;
    }
  };

  export const postRequestData = async (route, data) => {
    try {
      const response = await axios.post(route, data);
      return response;
    } catch (error) {
      if (
        error.response.data.statusCode == 400 ||
        error.response.data.statusCode == 422 ||
        error.response.data.statusCode == 500 || 
        error.response.data.statusCode == 401 
      ) {
        return error.response.data;
      }
      return error;
    }
  };
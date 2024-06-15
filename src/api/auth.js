


import { toast } from "react-toastify";
import { ENV } from "../utils/constants";

export class Auth {
  async register(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      };

      const response = await fetch(url, params);
      if (!response.ok) {
        const errorData = await response.json();
        toast.success(errorData.message)
        throw new Error(errorData.message);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include'
      };

      const response = await fetch(url, params);
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message)
        throw new Error(errorData.message);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

}
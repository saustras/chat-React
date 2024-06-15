import { ENV } from "../utils/constants";

export class User {
    async getUser() {
        try {
            const token = localStorage.getItem("token")
            const url =`${ENV.API_URL}/${ENV.ENDPOINTS.USERDETAILS}`
            const params = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": token 
              },
            };
            const response = await fetch(url, params);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData);
              }

            const result = await response.json()
            return result.data;
        } catch (error) {
          console.error('Error en la peticion:', error);
          return null;
        }
    }

    async getAllUser(search) {
      try {
          const url =`${ENV.API_URL}/${ENV.ENDPOINTS.ALLUSER}`
          const params = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({search: search})
          };
          const response = await fetch(url, params);

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData);
            }
            const result = await response.json()
          return result.data;
      } catch (error) {
        console.error('Error en la peticion:', error);
        return null;
      }
  }

    async updateUser(userId,data) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}/ ${userId}`;
            const params = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            };
      
            const response = await fetch(url, params);
            
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData);
              }
              return await response.json();
          } catch (error) {
            console.error('Error en la peticion:', error);
            return null;
          }
    }

}
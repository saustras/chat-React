
import { ENV } from "../utils/constants";
export const uploadFile = async(file)=>{

    try {
        const url = `https://api.cloudinary.com/v1_1/${ENV.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`
        const formData = new FormData()
        formData.append('file',file)
        formData.append("upload_preset","chat-app-file")
    
        const response = await fetch(url,{
            method : 'post',
            body : formData
        })
        const responseData = await response.json()
        console.log(responseData)
        return responseData
    } catch (error) {
        throw error;
    }
}


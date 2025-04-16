import { API_PATHS } from "./apipath";
import axiosInstance from "./axios";

const uploadImage= async (imageFile)=>{
    const formData= new FormData;
    // Append image file to forma data;
    formData.append('image', imageFile);

    try{
        const response= await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multiprt/form-data'
            }
        });
        return response.data
    }
    catch(error){
        console.error("Error Uploading Image", error);
        throw error;
    }
};
export default uploadImage
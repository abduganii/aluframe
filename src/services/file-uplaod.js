import api from "./api";


export const FileUpload = async (data) => { 
    const response = await api.post('/image-upload', data, {
        headers: {
            'Content-Type': "multipart/form-data",
    }},);
    return response;
}
export const FileRemove = async (body) => { 
    const response = await api.delete(`${import.meta.env.VITE_API_STORE_URL}remove`,{data:body});
    return response;
}
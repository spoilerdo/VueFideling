import axios from 'axios';

export const setTokenHeader = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

//method: get/post/etc, path: api path, data: JSON
export const apiCall = (method, path, data) => {
    return axios[method.toLowerCase()](path, data, {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
        .then(res => {
            return res.data;
        })
        .catch(e => {
            return e.response.data.error;
        })
}
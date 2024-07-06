import axios from 'axios';
 
/**
* Generic Method to make an axios GET method 
* @param {*} path
*/
 
export const API_FETCH = async (path) => {
    // log('---Calling GET Method')
    try {
        const response = await axios.get(path);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error.response);
    }
};
 
/**
* Generic Method to make an axios POST method 
* @param {*} path
* @param {*} payload
*/
 
 
export const API_POST = async (path, payload) => {
    try {        
        const response = await axios.post(path, payload);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error.response);
    }
};
 
/**
* Generic Method to make an axios PUT method
* @param {*} path
* @param {*} payload
*/
 
export const API_UPDATE = async (path, payload) => {
    try {
        const response = await axios.put(path, payload);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error.response);
    }
};
 
/**
* Generic Method to make an axios DELETE method
* @param {*} path
*/
 
export const API_DELETE = async (path) => {
    try {
        const response = await axios.delete(path);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error.response);
    }
};
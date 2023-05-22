import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

/**
* Intercepts requests and responses before they are handled by 
* then() or catch()
*/
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(import.meta.env.VITE_API_TOKEN_KEY);
  // Apply Authorization Header wit API Token before the request goes out
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use((response) => {
  return response;
}, (reject) => {
  try {
    if(axios.isCancel(reject)) {
      return;
    }
    // destructure the actual response coming from the server
    const {response} = reject;
    // if the user is unauthorized, or if the token is invalid for some reason
    if(response.status === 401) {
      localStorage.removeItem(import.meta.env.VITE_API_TOKEN_KEY);
    }
  } catch(error) {
    console.error('Axios Error: ', error);
  }

  throw reject;
});

export const cancelPendingRequest = () => axios.CancelToken.source();
export default axiosClient;

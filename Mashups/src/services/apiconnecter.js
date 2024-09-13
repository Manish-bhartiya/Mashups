import axios from 'axios';

export const axiosinstance = axios.create({});

const Base_url = 'https://mashupsbackand.vercel.app/api';
// const Base_url = 'http://localhost:4001/api'; // Use this for local development

export const apiconnecter = (method, url, bodydata, headers, params) => {
  return axiosinstance({
    method: method,
    url: `${Base_url}${url.startsWith('/') ? url.slice(1) : url}`, // Removes leading slash if it exists
    data: bodydata ? bodydata : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};

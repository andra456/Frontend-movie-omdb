
import { handleErrors, _checkStatus } from '../errorhandling';
import axios, { AxiosError } from "axios";
export const ERROR_NO_CONNECTION = ['Sorry there is problem. Pleas refresh again.'];
export const RESPONSE_SUCCESS = 'SUCCESS';
export const RESPONSE_ERROR = 'ERROR';

const base_url: string = (process.env.REACT_APP_BASE_URL as string)


axios.defaults.baseURL = base_url;



function filtered(obj: any) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
      delete obj[propName];
    }
  }
  return obj
}

export const fetchAPI = (type: any, url: string, params: any) => {

  let config;
  let set = { method: type, url }
  switch (type) {
    case 'GET':
      config = { ...set, params: filtered(params) }
      break;
    default:
      config = { ...set, data: params }
      break;
  }


  const ft = axios(config).then(_checkStatus)
    .catch((error: Error | AxiosError) => {
      if (axios.isCancel(error)) {
        console.log("Request cancelled by user");
      } else {
        handleErrors(error);
      }
    });
  return ft

}










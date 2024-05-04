import createClient from "openapi-fetch";
import {paths} from "./strapi"
import {getJwtToken} from "../auth";
import qs from 'qs'

export type ErrorResponse<T extends object = object> = {
  "data": T,
  "error": {
    "status": number,
    "name": string,
    "message": string,
    "details": Record<string, string>
  }
}

export const useApi = (token = getJwtToken()) => {
  return createClient<paths>({
    querySerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
    baseUrl: `${process.env.CMS_HOST}/api`,
    ...(token ? { headers: { "Authorization": `Bearer ${token}` } } : {}),
  })
}

export function isErrorResponse<T extends object>(response: any): response is ErrorResponse<T> {
  return response?.error?.status !== undefined;
}

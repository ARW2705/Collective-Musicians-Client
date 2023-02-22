import axios, { AxiosRequestConfig } from 'axios'

import { QueryRequest } from '../models/query-request'
import { QueryParams } from '../models/query-params'
import { QueryFilter } from '../models/query-filter'

import intercept from './interceptors/intercept'


intercept(axios)

async function request(config: QueryRequest): Promise<{[key: string]: any}> {
  const requestConfig: AxiosRequestConfig = {
    ...config,
    baseURL: 'http://localhost:3000',
    validateStatus: (status: number): boolean => status < 400
  }

  return (await axios(requestConfig)).data
}

async function get<T>(url: string, params: QueryParams = {}): Promise<T> {
  return (await request({ url, params, method: 'GET' })) as T
}

async function query<T>(url: string, params: QueryParams = {}, data: QueryFilter): Promise<T> {
  return await request({ url, params, data, method: 'POST'}) as T
}


export {
  get,
  query
}

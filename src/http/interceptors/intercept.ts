import { AxiosStatic } from 'axios'
import appendJsonHeader from './request/json-header.interceptor'


function intercept(axiosRef: AxiosStatic): void {
  appendJsonHeader(axiosRef)
}


export default intercept

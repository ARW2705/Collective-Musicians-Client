import { AxiosStatic } from 'axios'
import setAPIRoute from './request/api-route.interceptor'
import appendJsonHeader from './request/json-header.interceptor'


function intercept(axiosRef: AxiosStatic): void {
  setAPIRoute(axiosRef)
  appendJsonHeader(axiosRef)
}


export default intercept

import axios from 'axios'
import Cookies from 'js-cookie'

export const COOKIE_TOKEN = Cookies.get('Codescape_Token')

export const CODESCAPE_API =
  'https://dev.codeuntapped.com/jmc/flask-server/api/v1/virtualcoach/user-roles'

export const axiosInstance = axios.create({
  timeout: 2000,
  headers: { Authorization: `Bearer ${COOKIE_TOKEN}` },
})

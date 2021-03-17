import axios from 'axios'
import Cookies from 'js-cookie'

export const COOKIE_TOKEN = Cookies.get('Codescape_Token')

export const TOKEN =
  'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJvcmlnX2lhdCI6IDE2MTU5ODYzMDMuMCwgInVzZXJfZ3JvdXBzIjogeyIzIjogImxlYXJuZXIiLCAiNiI6ICJhc3Nlc3NlZSJ9LCAiaG1hY19rZXkiOiAiZDE5NjMzNTItZjI0Yi00ZjFjLWFmMmUtNGJkYjQ0MDljMTk1IiwgInVzZXIiOiB7ImZpcnN0X25hbWUiOiAiMSIsICJsYXN0X25hbWUiOiAiMSIsICJyZWdpc3RyYXRpb25faWQiOiAiIiwgImVtYWlsIjogImIxQHlvcG1haWwuY29tIiwgInJlc2V0X3Bhc3N3b3JkX2tleSI6ICIiLCAicmVnaXN0cmF0aW9uX2tleSI6ICIiLCAiaWQiOiAzNH0sICJleHAiOiAxNjE1OTg3MTAxLjAsICJpYXQiOiAxNjE1OTg2ODAxLjB9.O4YNErbrGXIMuLS8kW44bvbk97VYIcW8BpRbLwEcVr4'

export const CODESCAPE_API =
  'https://dev.codeuntapped.com/jmc/flask-server/api/v1/virtualcoach/user-roles'

export const axiosInstance = axios.create({
  timeout: 2000,
  headers: { Authorization: `Bearer ${COOKIE_TOKEN || TOKEN}` },
})

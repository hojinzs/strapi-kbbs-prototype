import {jwtDecode} from "jwt-decode";
import {cookies} from "next/headers";

export type Session = { id: number, iat: number, exp: number }

export const AuthCookieName = 'kbbs.access.token';




export const getJwtToken = () => cookies().get(AuthCookieName)?.value|| process.env.PUBLIC_TOKEN

export const getServerSession = () => {
  const token = cookies().get(AuthCookieName)?.value
  if (!token) {
    return null
  }
  return jwtDecode(token) as Session
}

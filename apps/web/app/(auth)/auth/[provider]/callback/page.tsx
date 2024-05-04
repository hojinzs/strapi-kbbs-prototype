import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {AuthCookieName} from "../../../../../libs/auth";
import {ProviderCallback} from "../../../../../libs/api/auth";

export interface AuthProviderCallbackPageProps {
  params: {
    provider: string
  },
  searchParams: {
    id_token: string
    access_token: string
  }
}
export default function AuthProviderCallbackPage({
  params: { provider },
  searchParams
}: AuthProviderCallbackPageProps) {

  async function next() {
    'use server'
    const response = await fetch(`${process.env.CMS_HOST}/api/auth/${provider}/callback?access_token=${searchParams.access_token}`)
    const data = await response.json() as ProviderCallback

    console.log("data => ", data)

    cookies().set(AuthCookieName, data.jwt)
    redirect('/')
  }

  return (
    <div>
      <form action={next}>
        { provider }로 로그인을 계속합니다.
        <button type="submit">계속하기</button>
      </form>
    </div>
  )
}

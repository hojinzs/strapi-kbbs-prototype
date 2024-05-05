import Link from "next/link";
import {useApi} from "../../../libs/api";
import {AuthCookieName, getServerSession} from "../../../libs/auth";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Image from "next/image";

export default async function TopNavigationBar() {
  const response = await useApi().GET('/metadata', {
    params: {
      query: {
        populate: "*"
      }
    }
  })

  const session = getServerSession()

  const metadata = response.data?.data?.attributes

  console.log("response", response)

  async function signOut() {
    'use server'
    cookies().delete(AuthCookieName)
    redirect('/')
  }

  return (
    <div className="sticky backdrop-blur-2xl top-0 left-0 right-0">
      <nav className="container mx-auto px-4 py-2 flex flex-row items-center">
        <Link className="flex items-center" href={'/'}>
          {metadata?.logo && (
            <Image
              className="rounded-xl w-8 h-8 mr-4"
              src={`${metadata!.logo!.data!.attributes!.url}`}
              alt={metadata?.logo?.data?.attributes?.alternativeText || ""}
              width={metadata!.logo!.data!.attributes!.width}
              height={metadata!.logo!.data!.attributes!.height}
            />
          )}
          <h1 className="">
            {metadata?.title || "Untitled"}
          </h1>
        </Link>
        <div className="flex flex-grow justify-end ">
          {session ? (
            <form action={signOut}>
              <button type="submit">
                로그아웃
              </button>
            </form>
          ) : (
            <Link href={`${process.env.CMS_HOST}/api/connect/google`}>
              Google Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

import {useApi} from "../../../../../libs/api";
import {redirect, RedirectType} from "next/navigation";
import Link from "next/link";

export interface PostDeletePageProps {
  params: { slug: number, id: number }
}

export default function PostDeletePage({ params }: PostDeletePageProps) {

  async function confirmDelete(){
    'use server'
    console.log("delete")
    const response = await useApi().DELETE(`/posts/{id}`, {
      params: { path: { id: params.id }}
    })

    console.log("delete response", response)

    if(response.error) {
      redirect(`/${params.slug}`, RedirectType.replace)
    }

    if(response.data) {
      redirect(`/${params.slug}`, RedirectType.replace)
    }
  }

  return (
    <dialog open>
      <form action={confirmDelete}>
        삭제합니다. 계속하시겠습니까?
        <Link href={`/${params.slug}/${params.id}`} replace>
          아니오
        </Link>
        <button type="submit">
          네
        </button>
      </form>
    </dialog>
  )
}

import {useApi} from "../../../../../libs/api";
import {revalidatePath} from "next/cache";
import {getServerSession} from "../../../../../libs/auth";

export interface CommentProps {
  wrapperClassName?: string
  slug: number
  id: number
  message: string
  commenter: { id?: number, attributes?: { username?: string }}
}

export default function Comment({ id, message, commenter, slug, wrapperClassName }: CommentProps) {

  const canDelete = commenter.id === getServerSession()?.id

  async function deleteComment() {
    'use server'
    await useApi().DELETE(`/comments/{id}`, {
      params: { path: { id }}
    })
    revalidatePath(`/${slug}/${id}`)
  }

  return (
    <div className={wrapperClassName}>
      <span className="text-sm text-gray-500 block">{ commenter.attributes?.username }</span>
      <span>{ message }</span>
      { canDelete && (
        <form action={deleteComment}>
          <button className="py-1 px-2 rounded bg-red-800 text-xs text-white" type="submit">
            삭제
          </button>
        </form>
      )}
    </div>
  )
}

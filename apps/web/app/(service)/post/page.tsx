import {getServerSession} from "../../../libs/auth";
import {useApi} from "../../../libs/api";
import {redirect, RedirectType} from "next/navigation";

export interface NewPostProps {
  searchParams: { topic: number}
}

export default async function NewPost({ searchParams }: NewPostProps) {

  const session = getServerSession();

  const board = await useApi().GET('/topics/{id}', {
    params: { path: { id: searchParams.topic as any }}
  })

  const boardId = board.data!.data!.id

  if(board.error || !board.data) {
    return (
      <div>
        <p>로그인이 필요합니다.</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div>
        <p>로그인이 필요합니다.</p>
      </div>
    )
  }


  async function submit(formData: FormData) {
    'use server'
    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      topic: formData.get("topic") as string,
    }

    const response = await useApi().POST(`/posts`, {
      body: { data }
    })

    const boardSlug = board.data?.data?.attributes?.slug

    redirect(`/${boardSlug}/${response.data!.data!.id}`, RedirectType.replace)
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4">새 게시물</h2>
      <form className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8" action={submit}>
        <div className="md:col-span-2">
          <div className="flex flex-col">
            <input className="bg-transparent border-solid border border-gray-300 bg-gray-100 mb-2 rounded-lg h-10 px-4"
                   name="title" required/>
            <textarea className="bg-transparent border-solid border border-gray-300 bg-gray-100 h-64 mb-4 rounded-lg p-4"
                      name="content" required/>
            <input
              name="topic"
              hidden
              value={boardId}
            />
          </div>
        </div>
        <div>
          <div className="">
            <p>
              게시판: { board.data?.data?.attributes?.title }
            </p>
            <button className="w-full bg-blue-600 px-4 py-2 rounded-md text-white" title="submit">저장</button>
          </div>
        </div>
      </form>
    </>
  )
}

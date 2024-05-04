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

  console.log("board", board)

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
      topic: searchParams.topic
    }

    const response = await useApi().POST(`/posts`, {
      body: { data }
    })

    redirect(`/${data.topic}/${response.data!.data!.id}`, RedirectType.replace)
  }

  return (
    <>
      <h2 className="px-6 text-xl font-bold mt-8">새 게시물</h2>
      <form className="grid grid-cols-3 gap-4 px-6" action={submit}>
        <div className="col-span-2 bg-gray-200 rounded-xl py-4">
          <hr/>
          <div className="flex flex-col px-6">
            <input className="bg-transparent border-solid border border-gray-300 bg-gray-100 mb-2 rounded-lg h-10 px-4"
                   name="title" required/>
            <textarea className="bg-transparent border-solid border border-gray-300 bg-gray-100 h-64 mb-4 rounded-lg p-4"
                      name="content" required/>
          </div>
        </div>
        <div>
          <div className="bg-gray-100 px-6 py-4">
            <p>
              게시판: { board.data?.data?.attributes?.title }
            </p>
            <button className="w-full bg-blue-700" title="submit">저장</button>
          </div>
        </div>
      </form>
    </>
  )
}

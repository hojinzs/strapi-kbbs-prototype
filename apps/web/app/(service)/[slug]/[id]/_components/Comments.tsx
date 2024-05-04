import {useApi} from "../../../../../libs/api";
import {revalidatePath} from "next/cache";
import {getServerSession} from "../../../../../libs/auth";

export interface PostCommentsProps {
  topicSlug: number
  postId: number
}

export default function PostComments({ topicSlug, postId}: PostCommentsProps) {

  const session = getServerSession();

  async function submitComment(formData: FormData) {
    'use server'
    const data = {
      message: formData.get("message") as string,
      post: postId,
    }
    await useApi().POST('/comments', {
      body: { data }
    })
    revalidatePath(`/${topicSlug}/${postId}`)
  }

  if(!session) {
    return (
      <div>
        <p>로그인이 필요합니다.</p>
      </div>
    )
  }

  return (
    <div className="">
      <h4 className="text-sm font-semibold">댓글 작성</h4>
      <form className="flex flex-row gap-6 py-4" action={submitComment}>
        <textarea className="flex-grow border-solid border-gray-200 border rounded p-2" name="message"/>
        <div className="flex-shrink-0">
          <button className="px-4 py-2 rounded border-gray-600 border-solid border" type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}

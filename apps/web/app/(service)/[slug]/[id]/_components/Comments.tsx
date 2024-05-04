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

    console.log("data", data)
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
    <div>
      <h4>댓글 작성</h4>
      <form action={submitComment}>
        <textarea name="message"/>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

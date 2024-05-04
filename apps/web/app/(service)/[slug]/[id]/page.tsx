import {useApi} from "../../../../libs/api";
import {notFound} from "next/navigation";
import {revalidatePath} from "next/cache";
import PostComments from "./_components/Comments";
import Link from "next/link";
import Comment from "./_components/Comment";
import {format} from "date-fns";

export interface PostPageProps {
  params: { slug: number, id: number }
}

export default async function PostPage({ params }: PostPageProps) {

  const topicResponse = await useApi().GET('/topics/{id}', {
    params: {
      path: { id: params.slug }
    }
  })

  const postResponse = await useApi().GET('/posts/{id}', {
    params: {
      path: { id: params.id },
      query: {
        populate: 'author'
      }
    },
  })

  const commentsResponse = await useApi().GET('/comments', {
    params: {
      query: {
        populate: 'commenter',
        filters: {
          // @ts-ignore
          ['post']: params.id
        }
      }
    }
  })

  return (
    <div>
      <div>
        <Link
          className="text-blue-500 hover:underline"
          href={`/${params.slug}`}
        >
          {topicResponse.data?.data?.attributes?.title}
        </Link>
      </div>
      <h2 className="text-xl font-bold">{postResponse.data?.data?.attributes?.title}</h2>
      <ul className="py flex flex-row justify-end gap-2 text-sm">
        <li>
          { postResponse.data?.data?.attributes?.author?.data?.attributes?.username }
        </li>
        <li className="text-gray-600 text-sm">
          { postResponse.data?.data?.attributes?.createdAt && format(new Date(postResponse.data?.data?.attributes?.createdAt), 'M/d')}
        </li>
      </ul>
      <hr className="my-4"/>
      <div className="my-4">
        <p>{postResponse.data?.data?.attributes?.content}</p>
      </div>
      <div className="toolbar flex flex-row bg-gray-100 px-6 py-4 rounded-2xl">
        <div className="flex-grow">
          <button className="px-4 py-2 rounded-lg text-gray-600">
            공감
          </button>
          <button className="px-4 py-2 rounded-lg text-gray-600">
            공유
          </button>
          <button className="px-4 py-2 rounded-lg text-gray-600">
            신고하기
          </button>
        </div>
        <div>
          <Link href={`/${params.slug}/${params.id}/delete`}>
            <button className="px-4 py-2 bg-red-600 rounded-lg text-white">
              삭제
            </button>
          </Link>
        </div>
      </div>
      <h4 className="my-4 text-lg font-semibold">댓글</h4>
      {commentsResponse.data?.data?.length === 0 ? (
        <div className="text-center py-6 text-gray-400 text-sm">
          <p>댓글이 없습니다.</p>
        </div>
      ): (
        <ul>
          {commentsResponse.data!.data!.map(comment => (
            <li key={comment.id}>
              <Comment
                id={comment.id!}
                slug={params.slug}
                message={comment.attributes!.message!}
                commenter={comment.attributes!.commenter!.data!}
              />
            </li>
          ))}
        </ul>
      )}
      <hr className="py-2"/>
      <PostComments
        topicSlug={params.slug}
        postId={params.id}
      />
    </div>
  );
}

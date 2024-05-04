import {useApi} from "../../../../libs/api";
import {notFound} from "next/navigation";
import {revalidatePath} from "next/cache";
import PostComments from "./_components/Comments";
import Link from "next/link";
import Comment from "./_components/Comment";

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

  console.log("commentsResponse", JSON.stringify(commentsResponse))


  return (
    <div>
      <div className="pb-2">
        <h2 className="text-xl font-bold mt-8">{postResponse.data?.data?.attributes?.title}</h2>
      </div>
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
      <h4>댓글</h4>
      <ul>
        {commentsResponse.data?.data?.map(comment => (
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
      <PostComments
        topicSlug={params.slug}
        postId={params.id}
      />
    </div>
  );
}

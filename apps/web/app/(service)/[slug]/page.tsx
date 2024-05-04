import {useApi} from "../../../libs/api";
import {notFound} from "next/navigation";
import Link from "next/link";


export interface TopicPageProps {
  params: { slug: string }
}

export default async function TopicPage({params}: TopicPageProps) {

  const response = await useApi().GET('/topics/{id}', {
    params: { path: { id: params.slug as any }}
  })

  const postsResponse = await useApi().GET('/posts', {
    params: {
      query: {
        filters: {
          // @ts-ignore
          ['topic']: params.slug
        }
      }
    }
  })

  if(response.error) {
    notFound()
  }

  return (
    <>
      <div className="flex flex-row items-baseline">
        <h2 className="text-xl font-bold mt-8">{response.data.data?.attributes?.title}</h2>
        <div className="flex flex-grow justify-end">
          <Link className="bg-sky-700 rounded-xl px-4 py-2 text-white font-bold" href={`/post?topic=${params.slug}`}>
            새 게시물
          </Link>
        </div>
      </div>
      <ul>
        {postsResponse.data?.data?.map(post => (
          <li key={post.id}>
            <Link href={`/${params.slug}/${post.id}`}>
              {post.attributes!.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

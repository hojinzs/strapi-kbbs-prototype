import {useApi} from "../../../libs/api";
import {notFound, redirect} from "next/navigation";
import Link from "next/link";
import {format} from "date-fns";
import Paginate from "../../../components/ui/Paginate";
import qs from "qs";

export interface TopicPageProps {
  params: { slug: string },
  searchParams: { page: number }
}

/**
 * 게시판 게시물 목록 페이지
 * @param params
 * @param searchParams
 * @constructor
 */
export default async function TopicPage({ params, searchParams }: TopicPageProps) {

  const currentPage = searchParams.page || 1
  const pageSize = 20

  const topicResponse = await useApi().GET('/topics/{id}', {
    params: { path: { id: params.slug as any } }
  })

  const postsResponse = await useApi().GET('/posts', {
    params: {
      query: {
        populate: 'author',
        filters: {
          // @ts-ignore
          topic: {
            slug: params.slug
          }
        },
        ['pagination[page]']: currentPage,
        ['pagination[pageSize]']: pageSize,
        ['pagination[withCount]']: true
      }
    }
  })

  async function handlePageChange(page: number) {
    'use server'
    const slug = params.slug
    const query = qs.stringify({
      ...searchParams,
      page
    })
    redirect(`/${slug}?${query}`)
  }

  if(topicResponse.error) {
    notFound()
  }

  return (
    <>
      <div className="flex flex-row items-baseline">
        <h2 className="text-xl font-bold">{topicResponse.data.data?.attributes?.title}</h2>
        <div className="flex flex-grow justify-end">
          <Link className="bg-sky-700 rounded-xl px-4 py-2 text-white font-bold" href={`/post?topic=${params.slug}`}>
            새 게시물
          </Link>
        </div>
      </div>
      <hr className="mt-4"/>
      <ul className="text-sm">
        {postsResponse.data?.data?.map(post => (
          <Link href={`/${params.slug}/${post.id}`} key={post.id}>
            <li className="py-2 grid grid-cols-8 border-b border-solid border-b-gray-200 hover:bg-gray-200">
              <span className="inline-block col-span-6">
                <span className="w-10 text-center inline-block">
                  {post.id}
                </span>
                {post.attributes!.title}
              </span>
              <span className="inline-block overflow-hidden">
                {post.attributes!.author!.data!.attributes!.username}
              </span>
              <span className="inline-block text-center">
                {format(new Date(post.attributes!.createdAt!), 'MM/dd')}
              </span>
            </li>
          </Link>
        ))}
      </ul>
      <Paginate
        currentPage={postsResponse.data?.meta?.pagination?.page || 1}
        totalPages={postsResponse.data?.meta?.pagination?.pageCount || 0}
        onPageChange={handlePageChange}
      />
    </>
  );
}

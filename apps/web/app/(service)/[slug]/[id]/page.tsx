import {useApi} from "../../../../libs/api";
import PostComments from "./_components/Comments";
import Link from "next/link";
import Comment from "./_components/Comment";
import {format} from "date-fns";
import {marked, RendererObject} from "marked";

export interface PostPageProps {
  params: { slug: number, id: number }
}
const renderer: RendererObject = {
  paragraph(text: string): string {
    return `<p class="text-base mb-4">${text}</p>`
  },
  blockquote(quote: string): string {
    return `<blockquote class="border-l-4 border-gray-400 pl-4">${quote.replaceAll('\n', '<br/>')}</blockquote>`
  },
  image(href: string, title: string | null, text: string): string {
    return `<img src="${href}" alt="${text}" class="block max-w-full rounded-lg"/><small class="block text-gray-400">${text}</small>`
  },
  heading(text: string, level: number) {
    const headingTag = [
      'h3',
      'h4',
      'h5',
      'h6',
    ]
    const textSizeClassName = [
      'text-3xl',
      'text-2xl',
      'text-xl',
      'text-lg',
    ]
    const tag = headingTag[level - 1] || 'p'
    const className= textSizeClassName[level - 1] || ''
    return `<${tag} class="${className} mb-4">${text}</${tag}>`
  },
  link(href, title, text) {
    return `<a href="${href}" target="_blank">${text}</a>`
  },
  list(body: string, ordered: boolean, start: number | ""): string {
    const tag = ordered ? 'ol' : 'ul'
    const className = ordered ? 'list-decimal' : 'list-disc'
    return `<${tag} class="${[className, 'pl-4 mb-4'].join(' ')}">${body}</${tag}>`
  },
  code(code: string): string {
    return `<pre class="bg-gray-100 p-4 rounded-lg mb-4"><code class="text-base">${code}</code></pre>`
  }
}
marked.use({ renderer })

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

  const html = await marked(postResponse.data?.data?.attributes?.content!)

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
      <div
        className="my-4"
        dangerouslySetInnerHTML={{__html: html }}
      />
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

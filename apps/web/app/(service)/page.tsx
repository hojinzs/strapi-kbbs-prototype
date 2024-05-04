import {useApi} from "../../libs/api";
import Link from "next/link";

export default async function MainPage() {
  const boards = await useApi().GET('/topics')
  return (
    <>
      <div className="bg-gray-100 w-full p-8 rounded-2xl">
        땜방
      </div>
      <div className="my-4">
        <h2 className="text-xl font-bold my-8 mb-4">게시판 목록</h2>
      </div>
      <ul>
        {boards.data?.data?.map((board) => (
          <li>
            <Link href={`/${board.attributes!.slug}`}>{board.attributes?.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

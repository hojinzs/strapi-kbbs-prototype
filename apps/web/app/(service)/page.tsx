import {useApi} from "../../libs/api";
import Link from "next/link";

export default async function MainPage() {
  const boards = await useApi().GET('/topics')
  return (
    <>
      <div className="bg-gray-100 w-full p-8 rounded-2xl">
        땜방
      </div>
      <div className="px-4 mt-8 mb-4">
        <h2 className="text-xl font-bold my-8 mb-4">게시판 목록</h2>
      </div>
      <ul className="px-4">
        {boards.data?.data?.map((board) => (
          <li>
            <Link href={`/${board.id}`}>{board.attributes?.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

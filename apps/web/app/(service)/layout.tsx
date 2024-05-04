import {PropsWithChildren} from "react";
import TopNavigationBar from "./_components/TopNavigationBar";

export default async function RootLayout({
  children,
}: PropsWithChildren) {

  return (
    <>
      <TopNavigationBar />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 mt-4">
        <div className="hidden md:block">
          <div className="px-4 py-8 bg-gray-100 rounded-2xl">
            대충 사이드바
          </div>
        </div>
        <main className="md:col-span-2 lg:col-span-3">
          {children}
        </main>
      </div>
    </>
  );
}

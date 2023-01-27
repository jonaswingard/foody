import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className="bg-slate-200 h-screen">
      <Head>
        <title>Foody</title>
        <meta name="description" content="Food is good" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-3xl mx-auto p-5 md:p-0 ">
        {loading && <div>Loading...</div>}
        {session ? (
          <>
            <div>
              <h1 className="text-3xl">
                Welcome, {session.user?.name ?? session.user?.email}!
              </h1>
              <div>
                <Image
                  width={100}
                  height={100}
                  src={session.user?.image ?? ""}
                  alt=""
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <p>Please log in to continue</p>
          </>
        )}
      </main>
    </div>
  );
}

import Head from "next/head";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

const Base = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className="bg-slate-200 min-h-screen">
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
          <>{children}</>
        ) : (
          <>
            <p>Please log in to continue</p>
          </>
        )}
      </main>
    </div>
  );
};

export default Base;

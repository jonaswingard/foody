import { FC } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const Header: FC = () => {
  const { data: session } = useSession();

  return (
    <header className="p-6 flex justify-between text-white bg-slate-800">
      <Link href="/">
        <span className="logo">🍕🍔🌮</span>
      </Link>
      {session && (
        <div className="flex items-center">
          <div className="mr-1 rounded-full h-5 w-5 overflow-hidden">
            <Image
              width={20}
              height={20}
              src={session.user?.image ?? ""}
              alt=""
            />
          </div>
          {session.user?.name ?? session.user?.email}
          <div className="px-3">{" | "}</div>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
            className="btn-signin"
          >
            Sign out
          </Link>
        </div>
      )}
      {!session && (
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
          className="btn-signin"
        >
          Sign in
        </Link>
      )}
    </header>
  );
};

export default Header;

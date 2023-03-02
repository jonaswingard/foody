import { FC } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const Header: FC = () => {
  const { data: session } = useSession();

  return (
    <header className="p-6 flex gap-2 sm:gap-0 justify-center sm:justify-between items-center text-white bg-slate-800 flex-wrap sm:flex-nowrap ">
      <Link href="/">
        <h1 className="logo text-3xl">Foody v0.1 🍕🍔🌮</h1>
      </Link>
      <nav className="flex items-center gap-2 w-full sm:w-auto justify-center">
        <Link className="block underline underline-offset-2" href="/">
          Visa alla
        </Link>
        <span>|</span>
        <Link
          className="block underline underline-offset-2"
          href="/recipe/edit"
        >
          Skapa nytt
        </Link>
        <span>|</span>
        <Link className="block underline underline-offset-2" href="/types">
          Visa efter typ
        </Link>
      </nav>
      {session && (
        <div className="flex items-center gap-2">
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
          </div>
          <div>{" | "}</div>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
            className="btn-signin"
          >
            Logga ut
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
          Logga in
        </Link>
      )}
    </header>
  );
};

export default Header;

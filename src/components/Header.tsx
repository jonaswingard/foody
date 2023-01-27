import { FC } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Header: FC = () => {
  const { data: session } = useSession();

  return (
    <header>
      <Link href="/">
        <span className="logo">AppLogo</span>
      </Link>
      {session && (
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
          className="btn-signin"
        >
          SIGN OUT
        </Link>
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
          SIGN IN
        </Link>
      )}
    </header>
  );
};

export default Header;

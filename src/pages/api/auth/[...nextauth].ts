import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { NextApiRequest, NextApiResponse } from "next";

console.log("que");

if (
  !process.env.GITHUB_ID ||
  !process.env.GITHUB_SECRET ||
  !process.env.NEXT_PUBLIC_SECRET
) {
  throw new Error(
    "GITHUB_ID, GITHUB_SECRET and NEXT_PUBLIC_SECRET must be set"
  );
}

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

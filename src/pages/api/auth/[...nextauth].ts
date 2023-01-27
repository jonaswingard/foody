import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("GITHUB_ID and GITHUB_SECRET must be set");
}

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

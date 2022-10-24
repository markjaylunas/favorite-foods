import { Session } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";
// import prisma from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session: Session = req.body;
      const { id, email } = session.user;
      const provider = session.user.app_metadata.provider;

      if (id && email !== undefined && provider !== undefined) {
        // create user if not exists
        const userExists = await prisma.user.findFirst({ where: { id: id } });

        if (userExists === null) {
          await prisma.user.upsert({
            where: {
              id: id,
            },
            update: {},
            create: {
              id: id,
              email: email ? email : "unknown",
            },
          });
        }

        // create on sign in success
        await prisma.userSignIn.create({
          data: { email: email, method: provider, userId: id },
        });
        res.status(201).json({ message: `${email} Authenticated` });
      } else {
        res.status(401).json({ message: `Not Authorized` });
      }
    } catch (e) {
      res.status(500).json({ error: `Something went wrong` });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}

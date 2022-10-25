import { Post } from "@prisma/client";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServer = createServerSupabaseClient({ req, res });
  const {
    data: { session },
    error,
  } = await supabaseServer.auth.getSession();

  if (error) res.status(401).json({ error: `Not Authorized` });

  if (req.method === "POST") {
    try {
      const authorId = session?.user.id as string;
      const { title, description, image, rating, isPublic }: Post = req.body;
      // create post
      const post = await prisma.post.create({
        data: {
          authorId: authorId,
          title: title,
          description: description,
          image: image,
          rating: rating,
          isPublic: isPublic,
        },
      });
      res
        .status(201)
        .json({ post, message: `Post of ${post.title} successfully created.` });
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

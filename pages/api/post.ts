import { Post } from "@prisma/client";
import {
  createServerSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

type ApiUsageRecord = { api_name: string; called_by: string | undefined };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServer = createServerSupabaseClient({ req, res });
  const {
    data: { session },
    error,
  } = await supabaseServer.auth.getSession();

  if (error) res.status(401).json({ message: `Not Authorized` });

  await recordApiUsage(
    {
      called_by: session?.user.id,
      api_name: "create_post",
    },
    supabaseServer
  );

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
      res.status(500).json({ message: `Something went wrong` });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}

export const recordApiUsage = async (
  record: ApiUsageRecord,
  supabase: SupabaseClient
) => {
  try {
    const { error } = await supabase.from("api_usage_record").insert([record]);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

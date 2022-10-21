import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";
import { supabase } from "../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const exists = await prisma.user.findUnique({ where: { email: email } });

      if (exists) {
        res.status(409).json({ message: "Account already exists" });
      }

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) return res.status(401).json({ error: error.message });
      const { user } = data;
      if (user?.email && user.app_metadata.provider) {
        const {
          id,
          email,
          app_metadata: { provider },
        } = user;
        console.log(id, email, provider);
        const newUser = await prisma.user.create({
          data: { id: id, email: email, provider: provider },
        });
        if (newUser) {
          res
            .status(200)
            .json({ user: newUser, message: "Account successfully created" });
        } else {
          res
            .status(401)
            .json({ user: data.user, message: "Account creation failed" });
        }
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

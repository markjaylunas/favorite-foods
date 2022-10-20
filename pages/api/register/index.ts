import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) return res.status(401).json({ error: error.message });
      res.status(200).json({ user: data.user });
    } catch (e) {
      res.status(500).json({ message: `Something went wrong` });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}

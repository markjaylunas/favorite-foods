import { User } from "@prisma/client";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

export default function Profile({ user }: { user: User }) {
  return <div>Hello {user.email}</div>;
}

export const getServerSideProps = withPageAuth({ redirectTo: "/signin" });

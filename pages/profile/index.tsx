import { withPageAuth } from "@supabase/auth-helpers-nextjs";

const ProfilePage = () => {
  return <div>profile</div>;
};

export default ProfilePage;

export const getServerSideProps = withPageAuth({ redirectTo: "/sign-in" });

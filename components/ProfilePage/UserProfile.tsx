import { Avatar, Group, Space, Text } from "@mantine/core";
import { User } from "@prisma/client";
import { FC, ChangeEvent, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type Props = {
  user: User | null;
};

const UserProfile: FC<Props> = ({ user }) => {
  const [userProfile, setUserProfile] = useState<User | null>(user);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleCompressedUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const toastLoading = toast.loading("Please wait...");
    const currentAvatarPath =
      userProfile && userProfile.avatar
        ? getAvatarPath(userProfile.avatar)
        : "";

    const inputFile = e.target.files;
    if (inputFile === null) return;
    const image = inputFile[0];
    const fileReader = new FileReader();
    try {
      fileReader.readAsDataURL(image || new Blob());
      fileReader.onload = async () => {
        if (image) {
          const { data, error } = await supabaseClient.functions.invoke(
            "compress-image",
            {
              body: image,
            }
          );
          if (error) throw error;
          if (data) {
            await removeAvatar(currentAvatarPath);
            const publicURL = await getAvatarUrl(data.data.path);
            await updateAvatarURL(publicURL);
            toast.update(toastLoading, {
              render: "Uploaded",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            router.reload();
          }
        }
      };
    } catch (error) {
      console.error(error);
    }
  };

  const getAvatarPath = (avatar: string) => {
    if (avatar.length > 0) {
      return avatar.split("avatars/")[1].split("?")[0];
    } else {
      return avatar;
    }
  };

  const removeAvatar = async (path: string) => {
    const { data: removeData, error: removeError } =
      await supabaseClient.storage.from("avatars").remove([path]);
    if (removeError) throw removeError;
    return removeData;
  };
  const getAvatarUrl = async (path: string) => {
    const {
      data: { publicUrl },
    } = await supabaseClient.storage.from("avatars").getPublicUrl(path);
    const formattedUrl = `${publicUrl}?t=${new Date().toISOString()}`;
    return formattedUrl;
  };

  const updateAvatarURL = async (avatarURL: string) => {
    const { data: updateData, error: updateError } = await supabaseClient
      .from("User")
      .update({ avatar: avatarURL })
      .eq("id", userProfile?.id)
      .select("*");
    if (updateError) throw updateError;
    else {
      setUserProfile(updateData[0] as unknown as User);
    }
  };

  return (
    <>
      <Group align="flex-end">
        <Avatar
          src={userProfile?.avatar}
          alt={userProfile?.email}
          radius="lg"
          size="xl"
        />
        <Text size="lg">{userProfile?.email}</Text>
      </Group>
      <Space h="lg" />
      <input
        type="file"
        accept="image/jpeg"
        onChange={handleCompressedUpload}
      />
    </>
  );
};

export default UserProfile;

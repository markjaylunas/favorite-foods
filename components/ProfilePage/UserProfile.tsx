import { Avatar, Group, Space, Text } from "@mantine/core";
import { User } from "@prisma/client";
import { FC, ChangeEvent, useState } from "react";
import Compressor from "compressorjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

type Props = {
  user: User | null;
};

const UserProfile: FC<Props> = ({ user }) => {
  const [userProfile, setUserProfile] = useState<User | null>(user);
  const supabaseClient = useSupabaseClient();

  const handleCompressedUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const toastLoading = toast.loading("Please wait...");
    const inputFile = e.target.files;
    if (inputFile === null) return;
    const image = inputFile[0];
    try {
      new Compressor(image, {
        quality: 0.8,
        success: async (compressedResult) => {
          await saveAvatar(compressedResult);

          toast.update(toastLoading, {
            render: "Uploaded",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const saveAvatar = async (compressedFile: Blob) => {
    if (userProfile?.avatar) {
      await updateAvatar(compressedFile);
    } else {
      await uploadAvatar(compressedFile);
    }
  };

  const uploadAvatar = async (compressedFile: Blob) => {
    const { data: uploadData, error: uploadError } =
      await supabaseClient.storage
        .from("avatars")
        .upload(`public/${userProfile?.id}`, compressedFile);
    if (uploadError) {
      throw uploadError;
    } else {
      const publicURL = await getAvatarURL(uploadData.path);
      updateAvatarURL(publicURL);
    }
  };
  const updateAvatar = async (compressedFile: Blob) => {
    const { data: updateData, error: updateError } =
      await supabaseClient.storage
        .from("avatars")
        .update(`public/${userProfile?.id}`, compressedFile);
    if (updateError) {
      throw updateError;
    } else {
      const publicURL = await getAvatarURL(updateData.path);
      updateAvatarURL(publicURL);
    }
  };

  const getAvatarURL = async (path: string) => {
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
      .eq("id", userProfile?.id);
    if (updateError) throw updateError;
    else {
      console.log(updateData);
      setUserProfile(updateData as unknown as User);
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

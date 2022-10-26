import { Avatar, Group, Space, Text } from "@mantine/core";
import { User } from "@prisma/client";
import { FC, ChangeEvent } from "react";
import Compressor from "compressorjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

type Props = {
  user: User;
};

const UserProfile: FC<Props> = ({ user }) => {
  //   const [compressedFile, setCompressedFile] = useState(null);
  const supabaseClient = useSupabaseClient();

  const handleCompressedUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("upload trig");
    const toastLoading = toast.loading("Please wait...");
    const inputFile = e.target.files;
    if (inputFile === null) return;
    const image = inputFile[0];
    new Compressor(image, {
      quality: 0.8,
      success: async (compressedResult) => {
        console.log(compressedResult);
        const { data, error } = await supabaseClient.storage
          .from("avatars")
          .upload(`user/${user.id}.jpg`, compressedResult);
        if (error) {
          toast.update(toastLoading, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          console.log(data);
          toast.update(toastLoading, {
            render: `Avatar uploaded`,
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
        }
        // setCompressedFile(data?.path);
      },
    });
  };
  return (
    <>
      <Group align="flex-end">
        <Avatar src={user.avatar} alt={user.email} radius="lg" size="xl" />
        <Text size="lg">{user.email}</Text>
      </Group>
      <Space h="lg" />
      <input type="file" onChange={handleCompressedUpload} />
    </>
  );
};

export default UserProfile;

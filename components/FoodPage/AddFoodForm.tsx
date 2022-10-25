import { Checkbox, Modal, Textarea, TextInput } from "@mantine/core";
import { Post } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Type } from "./FoodList";
import { useState } from "react";
type Props = {
  type: Type;
  openedAddForm: boolean;
  setOpenedAddForm: Dispatch<SetStateAction<boolean>>;
  setInitialFoodList: Dispatch<SetStateAction<Post[]>>;
  setFilteredFoods: Dispatch<SetStateAction<Post[]>>;
};

const AddFoodForm: FC<Props> = ({
  type,
  openedAddForm,
  setOpenedAddForm,
  setInitialFoodList,
  setFilteredFoods,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Post>();
  const [loading, setLoading] = useState(false);
  const max = type === Type.Movie ? 10 : 5;
  // const formatPhone = (phone: string) => {
  //   return phone.replace(/(\d{4})(\d{3})(\d{4})/, "($1) $2 - $3");
  // };
  const onSubmit = async (data: Post) => {
    const toastLoading = toast.loading("Saving ...");
    try {
      setLoading(true);
      const response = await axios.post("/api/post", data);
      const newFood: Post = await response.data.post;

      if (newFood) {
        setInitialFoodList((foodlist) => [...foodlist, newFood]);
        setFilteredFoods((foodlist) => [...foodlist, newFood]);

        toast.update(toastLoading, {
          render: `${newFood.title} added to favourites`,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      }
      reset();
      setOpenedAddForm(false);
    } catch (error) {
      const err = error as AxiosError | Error;
      if (axios.isAxiosError(err)) {
        setLoading(false);
        toast.update(toastLoading, {
          render: err.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        console.error(err);
      }
    }
    setLoading(false);
  };

  return (
    <Modal
      opened={openedAddForm}
      onClose={() => setOpenedAddForm(false)}
      title={`Add new favourite`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="Enter title"
          label="Title"
          withAsterisk
          {...register("title", {
            required: "Title is required",
          })}
          aria-invalid={errors.title ? "true" : "false"}
        />
        <p role="alert" className="error">
          {errors.title?.message}
        </p>

        <Textarea
          placeholder="Enter description"
          label="Description"
          withAsterisk
          {...register("description", { required: "Description is required" })}
          aria-invalid={errors.description ? "true" : "false"}
        />
        <p role="alert" className="error">
          {errors.description?.message}
        </p>
        <TextInput
          placeholder="Enter an image link"
          label="Image URL"
          type="url"
          withAsterisk
          {...register("image", { required: "Image URL is required" })}
          aria-invalid={errors.image ? "true" : "false"}
        />
        <p role="alert" className="error">
          {errors.image?.message}
        </p>

        <TextInput
          placeholder={`Enter rating 1(lowest) - ${max}(highest)`}
          label="Rating"
          withAsterisk
          type="number"
          defaultValue={max}
          {...register("rating", {
            required: "Rating is required",
            valueAsNumber: true,
            min: {
              value: 1.0,
              message: "Rating must be at least 1",
            },
            max: {
              value: max,
              message: `Max rating is ${max}`,
            },
            minLength: {
              value: 1,
              message: "Must have at least one digit",
            },
          })}
          aria-invalid={errors.rating ? "true" : "false"}
        />

        <p role="alert" className="error">
          {errors.rating?.message}
        </p>

        <Checkbox label="Public" {...register("isPublic", { value: true })} />

        {/* <TextInput
          label="Phone"
          withAsterisk
          type="number"
          placeholder="e.g. 09123456789"
          {...register("phone", {
            required: "Phone number is required",
            minLength: {
              value: 11,
              message: "Must be exactly eleven(11) digits",
            },
            maxLength: {
              value: 11,
              message: "Must be exactly eleven(11) digits",
            },
          })}
        />
        <p role="alert" className="error">
          {errors.phone?.message}
        </p> */}

        <button disabled={loading ? true : false} className="btn">
          {loading ? "Saving ..." : "Save"}
        </button>
      </form>
    </Modal>
  );
};

export default AddFoodForm;

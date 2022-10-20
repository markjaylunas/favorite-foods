import { Modal, Textarea, TextInput } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FoodList, { FoodItem } from "../types/foodList";
import { Type } from "./FoodList";

type Props = {
  type: Type;
  openedAddForm: boolean;
  setOpenedAddForm: Dispatch<SetStateAction<boolean>>;
  setInitialFoodList: Dispatch<SetStateAction<FoodList>>;
  setFilteredFoods: Dispatch<SetStateAction<FoodList>>;
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
  } = useForm<FoodItem>();

  const max = type === Type.Movie ? 10 : 5;
  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{4})(\d{3})(\d{4})/, "($1) $2 - $3");
  };
  const onSubmit = (data: FoodItem) => {
    const dataFormatPhone =
      data.phone === undefined
        ? data
        : { ...data, phone: formatPhone(data.phone) };
    const newFood = { ...dataFormatPhone };
    setInitialFoodList((foodList) => [...foodList, newFood]);
    setFilteredFoods((foodList) => [...foodList, newFood]);
    reset();
    setOpenedAddForm(false);
    toast(`${newFood.title} added to favourites`);
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

        <TextInput
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
        </p>

        <button className="btn">Save</button>
      </form>
    </Modal>
  );
};

export default AddFoodForm;

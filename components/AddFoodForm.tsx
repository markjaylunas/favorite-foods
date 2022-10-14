import {
  Modal,
  Textarea,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FoodList, { FoodItem } from "../types/foodList";

interface Props {
  openedAddForm: boolean;
  setOpenedAddForm: Dispatch<SetStateAction<boolean>>;
  setInitialFoodList: Dispatch<SetStateAction<FoodList>>;
  setFilteredFoods: Dispatch<SetStateAction<FoodList>>;
}

const AddFoodForm: FC<Props> = ({
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

  const { colorScheme } = useMantineColorScheme();

  const onSubmit = (data: FoodItem) => {
    const newFood = { ...data, _id: Date.now() };
    setInitialFoodList((foodList) => [...foodList, newFood]);
    setFilteredFoods((foodList) => [...foodList, newFood]);
    reset();
    setOpenedAddForm(false);
    toast(`${newFood.title} added to favourite foods`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: colorScheme,
    });
  };

  return (
    <Modal
      opened={openedAddForm}
      onClose={() => setOpenedAddForm(false)}
      title="Add new favourite food"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="Enter food title"
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
          placeholder="Enter food rating 1(lowest) - 5(highest)"
          label="Rating"
          withAsterisk
          defaultValue={5}
          {...register("rating", {
            required: "Rating is required",
            valueAsNumber: true,
            min: {
              value: 1.0,
              message: "Rating must be at least 1",
            },
            max: {
              value: 5.0,
              message: "Max rating is 5",
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

        <button className="btn">Add Food to List</button>
      </form>
    </Modal>
  );
};

export default AddFoodForm;

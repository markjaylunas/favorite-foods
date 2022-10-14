import { Button, Modal, NumberInput, TextInput } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  openedAddForm: boolean;
  setOpenedAddForm: Dispatch<SetStateAction<boolean>>;
}

const AddFoodForm: FC<Props> = ({ openedAddForm, setOpenedAddForm }) => {
  return (
    <Modal
      opened={openedAddForm}
      onClose={() => setOpenedAddForm(false)}
      title="Add new favourite food"
    >
      <form>
        <TextInput placeholder="Enter food title" label="Title" withAsterisk />
        <TextInput
          placeholder="Enter description"
          label="Description"
          withAsterisk
        />
        <TextInput
          placeholder="Enter an image link"
          label="Image URL"
          withAsterisk
        />
        <NumberInput
          placeholder="Enter food rating 1(lowest) - 5(highest)"
          label="Rating"
          withAsterisk
        />
        <Button variant="filled">Add Food to List</Button>
      </form>
    </Modal>
  );
};

export default AddFoodForm;

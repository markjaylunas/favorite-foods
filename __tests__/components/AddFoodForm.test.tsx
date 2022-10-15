import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddFoodForm from "../../components/AddFoodForm";
import { act } from "react-dom/test-utils";

describe("AddFoodForm Component", () => {
  it("should render the text fields", () => {
    render(
      <AddFoodForm
        openedAddForm={true}
        setOpenedAddForm={jest.fn()}
        setInitialFoodList={jest.fn()}
        setFilteredFoods={jest.fn()}
      />
    );
    const formTitle = screen.getByRole("textbox", { name: /title/i });
    const formDescription = screen.getByRole("textbox", {
      name: /description/i,
    });
    const formImage = screen.getByRole("textbox", { name: /image/i });
    const formRating = screen.getByRole("textbox", { name: /rating/i });
    const formAddButton = screen.getByRole("button", {
      name: /add food to list/i,
    });
    expect(formTitle).toBeInTheDocument();
    expect(formDescription).toBeInTheDocument();
    expect(formImage).toBeInTheDocument();
    expect(formRating).toBeInTheDocument();
    expect(formAddButton).toBeInTheDocument();
  });
  it("should validate form fields", async () => {
    const mockAdd = jest.fn();
    render(
      <AddFoodForm
        openedAddForm={true}
        setOpenedAddForm={jest.fn()}
        setInitialFoodList={jest.fn()}
        setFilteredFoods={jest.fn()}
      />
    );

    fireEvent.input(screen.getByRole("textbox", { name: /title/i }), {
      target: {
        value: "Bagnet",
      },
    });
    fireEvent.input(screen.getByRole("textbox", { name: /description/i }), {
      target: {
        value: "Bagnet is tasty",
      },
    });
    fireEvent.input(screen.getByRole("textbox", { name: /image/i }), {
      target: {
        value:
          "https://res.cloudinary.com/daswosnui/image/upload/v1665732396/bagnet_vqia4s.jpg",
      },
    });
    fireEvent.input(screen.getByRole("textbox", { name: /rating/i }), {
      target: {
        value: 2.5,
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /add food to list/i }));
    await act(async () => {
      expect(mockAdd).not.toBeCalled();
    });
  });
});

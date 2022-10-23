import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddFoodForm from "../../components/FoodPage/AddFoodForm";
import { act } from "react-dom/test-utils";
import { Type } from "../../components/FoodPage/FoodList";

describe("AddFoodForm Component", () => {
  it("should render the form fields", () => {
    render(
      <AddFoodForm
        type={Type.Food}
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
    const formRating = screen.getByRole("spinbutton", { name: /rating/i });
    const formPhone = screen.getByRole("spinbutton", { name: /phone/i });
    const formAddButton = screen.getByRole("button", {
      name: /save/i,
    });
    expect(formTitle).toBeInTheDocument();
    expect(formDescription).toBeInTheDocument();
    expect(formImage).toBeInTheDocument();
    expect(formRating).toBeInTheDocument();
    expect(formPhone).toBeInTheDocument();
    expect(formAddButton).toBeInTheDocument();
  });
  it("should validate form fields", async () => {
    const mockAdd = jest.fn();
    render(
      <AddFoodForm
        type={Type.Food}
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
    fireEvent.input(screen.getByRole("spinbutton", { name: /rating/i }), {
      target: {
        value: 2.5,
      },
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /phone/i }), {
      target: {
        value: "09123456789",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /save/i }));
    await act(async () => {
      expect(mockAdd).not.toBeCalled();
    });
  });
});

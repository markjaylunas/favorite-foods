import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FoodCard from "../../components/FoodPage/FoodCard";
import foodList from "../../data/foodList";

const expectedFoodItem = foodList[0];

describe("FoodCard", () => {
  it("should render image, title, description, and rating ", () => {
    const { getByText, getByAltText } = render(
      <FoodCard foodItem={expectedFoodItem} />
    );

    const foodImage = getByAltText(expectedFoodItem.title);
    const foodTitle = getByText(expectedFoodItem.title);
    const foodDescription = getByText(expectedFoodItem.description);
    const foodRating = getByText(expectedFoodItem.rating);

    expect(foodImage).toBeInTheDocument();
    expect(foodTitle).toBeInTheDocument();
    expect(foodDescription).toBeInTheDocument();
    expect(foodRating).toBeInTheDocument();
  });
});

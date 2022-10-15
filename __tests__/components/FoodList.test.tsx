import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FoodList from "../../components/FoodList";
import foodList from "../../data/foodList";
import { sortByDecreasing, sortByIncreasing } from "../../pages/index";

const expectedFoodList = foodList;

describe("Render FoodList Component", () => {
  it("should render food not found if food list not greater than 1", () => {
    render(<FoodList foodList={[]} />);
    const foodNotFound = screen.getByText("Food not found");
    expect(foodNotFound).toBeInTheDocument();
  });
  it("should render food from the food list", () => {
    render(<FoodList foodList={expectedFoodList} />);
    expectedFoodList.map((food) => {
      const foodItemImage = screen.getByAltText(food.title);
      const foodItemTitle = screen.getByText(food.title);
      const foodItemDescription = screen.getByText(food.description);
      expect(foodItemImage).toBeInTheDocument();
      expect(foodItemTitle).toBeInTheDocument();
      expect(foodItemDescription).toBeInTheDocument();
    });
  });
  it("should sort food list by rating in increasing order", () => {
    const expectedIncreasingOrder = [
      {
        _id: 3,
        title: "Sisig",
        description:
          "In the culinary capital of Pampanga, they turn the pork's cheeks, head and liver into a sizzling dish called Sisig. The crunchy and chewy texture of this appetizer is a perfect match for a cold beer. Serve with hot sauce and Knorr seasoning to suit the preference of you and your buddies.",
        image: "/img/sisig.jpg",
        rating: 1,
      },
      {
        _id: 4,
        title: "Bulalo",
        description:
          "The broth is rich with flavors seeped from the beef after boiling for hours. The bones are big, meaning more bone marrow to enjoy.",
        image: "/img/bulalo.webp",
        rating: 2,
      },
      {
        _id: 5,
        title: "Sinigang",
        description:
          "Sinigang is a stew of fish, prawns, pork or beef soured by fruits like tamarind, kamias or tomatoes. Often accompanied by vegetables like kangkong, string beans and taro, this stew is eaten with rice. A modern, but delicious spin on Sinigang is Sentro 1771's version called Sinigang Corned Beef.",
        image: "/img/sinigang.jpg",
        rating: 2.5,
      },
      {
        _id: 2,
        title: "Lechon",
        description:
          "The entire pig is spit-roasted over coals, with the crisp, golden-brown skin served with liver sauce, the most coveted part. In Cebu, the stomach of the pig is stuffed with star anise, pepper, spring onions, laurel leaves and lemongrass resulting in an extremely tasty lechon, which needs no sauce.",
        image: "/img/lechon.avif",
        rating: 3.5,
      },
      {
        _id: 1,
        title: "Adobo",
        description:
          "A ubiquitous dish in every household in the Philippines, it's Mexican in origin. But Filipinos found that cooking meat (often chicken and pork) in vinegar, salt, garlic, pepper, soy sauce and other spices was a practical way to preserve it without refrigeration. This cooking style can be applied to different meats or even seafood. It's best sample it in a Filipino home, but the garlicky version of the lamb adobo can be found at Abe restaurant in Taguig.",
        image: "/img/adobo.jpg",
        rating: 5,
      },
    ];
    expect(sortByIncreasing(expectedFoodList)).toEqual(expectedIncreasingOrder);
  });
  it("should sort food list by rating in decreasing order", () => {
    const expectedDecreasingOrder = [
      {
        _id: 1,
        title: "Adobo",
        description:
          "A ubiquitous dish in every household in the Philippines, it's Mexican in origin. But Filipinos found that cooking meat (often chicken and pork) in vinegar, salt, garlic, pepper, soy sauce and other spices was a practical way to preserve it without refrigeration. This cooking style can be applied to different meats or even seafood. It's best sample it in a Filipino home, but the garlicky version of the lamb adobo can be found at Abe restaurant in Taguig.",
        image: "/img/adobo.jpg",
        rating: 5,
      },
      {
        _id: 2,
        title: "Lechon",
        description:
          "The entire pig is spit-roasted over coals, with the crisp, golden-brown skin served with liver sauce, the most coveted part. In Cebu, the stomach of the pig is stuffed with star anise, pepper, spring onions, laurel leaves and lemongrass resulting in an extremely tasty lechon, which needs no sauce.",
        image: "/img/lechon.avif",
        rating: 3.5,
      },
      {
        _id: 5,
        title: "Sinigang",
        description:
          "Sinigang is a stew of fish, prawns, pork or beef soured by fruits like tamarind, kamias or tomatoes. Often accompanied by vegetables like kangkong, string beans and taro, this stew is eaten with rice. A modern, but delicious spin on Sinigang is Sentro 1771's version called Sinigang Corned Beef.",
        image: "/img/sinigang.jpg",
        rating: 2.5,
      },

      {
        _id: 4,
        title: "Bulalo",
        description:
          "The broth is rich with flavors seeped from the beef after boiling for hours. The bones are big, meaning more bone marrow to enjoy.",
        image: "/img/bulalo.webp",
        rating: 2,
      },
      {
        _id: 3,
        title: "Sisig",
        description:
          "In the culinary capital of Pampanga, they turn the pork's cheeks, head and liver into a sizzling dish called Sisig. The crunchy and chewy texture of this appetizer is a perfect match for a cold beer. Serve with hot sauce and Knorr seasoning to suit the preference of you and your buddies.",
        image: "/img/sisig.jpg",
        rating: 1,
      },
    ];
    expect(sortByDecreasing(expectedFoodList)).toEqual(expectedDecreasingOrder);
  });
});

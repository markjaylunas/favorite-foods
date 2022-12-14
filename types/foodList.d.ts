export type FoodItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  phone?: string;
};

type FoodList = FoodItem[];

export default FoodList;

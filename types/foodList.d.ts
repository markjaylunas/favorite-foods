export interface FoodItem {
  _id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
}

type FoodList = FoodItem[];

export default FoodList;

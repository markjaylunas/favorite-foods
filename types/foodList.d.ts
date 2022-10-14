export interface FoodItem {
  _id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
}

type FoodList = FoodItem[];

export default FoodList;

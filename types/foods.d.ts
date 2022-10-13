export interface Food {
  _id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
}

type Foods = Food[];

export default Foods;

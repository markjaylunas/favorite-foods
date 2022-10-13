export interface Food {
  _id: string | number;
  name: string;
  description: string;
  rating: number;
}

type Foods = Food[];

export default Foods;

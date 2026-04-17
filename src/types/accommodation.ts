export interface Accommodation {
  id: number;
  image: string;
  badge: string;
  title: string;
  date?: {
    start: Date;
    end: Date;
  };
  price: number;
  nights?: number;
  rating?: number | null;
}

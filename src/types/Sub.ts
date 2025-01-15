export interface ISub {
  id: string;
  author: string;
  creationDate: Date;
  imageUrl?: string;
  nsfw?: boolean;
  description?: string;
  subscribers?: number;
}

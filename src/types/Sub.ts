export interface ISub {
  id: string;
  author: string;
  creationDate: Date;
  nsfw?: boolean;
  description?: string;
  subscribers?: number;
}

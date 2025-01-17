export interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  likes: number;
  dislikes: number;
  nsfw: boolean;
  mediaUrls?: string[];
}

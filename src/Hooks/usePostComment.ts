import { useState } from "react";
import { db } from "../utils/firebase"; // Assurez-vous que votre fichier firebase est correctement configuré
import { collection, addDoc, Timestamp } from "firebase/firestore";

const postComment = async (postId: string, userId: string, content: string) => {
  if (!postId || !userId || !content) {
    throw new Error("Post ID, User ID, and Content are required.");
  }

  const commentData = {
    postId,
    content,
    authorId: userId,
    likes: 0,
    dislikes: 0,
    createdAt: Timestamp.now(),
  };

  try {
    const docRef = await addDoc(collection(db, "comments"), commentData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding comment: ", error);
    throw new Error("Failed to post comment. Please try again later.");
  }
};

export const usePostComment = (
  postId: string | undefined,
  userId: string | undefined
) => {
  const [error, setError] = useState<string | null>(null);

  const handlePostComment = async (content: string) => {
    try {
      if (!postId || !userId) {
        throw new Error("Post ID and User ID are required.");
      }
      await postComment(postId, userId, content);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { handlePostComment, error };
};

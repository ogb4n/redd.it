import { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const postComment = async (postId: string, userId: string, content: string) => {
  if (!postId || !userId || !content) {
    console.log("Post ID, User ID, and Content are required.");
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
        console.error("Post ID and User ID are required.");
        return;
      }
      await postComment(postId, userId, content);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { handlePostComment, error };
};

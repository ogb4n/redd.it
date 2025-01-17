import { db } from "../utils/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDeletePost = (postId: string) => {
  const handleDeletePost = async () => {
    if (!postId) {
      console.error("Post ID is required");
      return;
    }

    const postDocRef = doc(db, "posts", postId);

    try {
      await deleteDoc(postDocRef);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return { handleDeletePost };
};

export default useDeletePost;

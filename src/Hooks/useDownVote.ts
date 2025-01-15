import { db } from "../utils/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../utils/AuthContext";

const useDownVote = () => {
  const { user } = useAuth();

  const handleDownVote = async (postId: string) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const postDocRef = doc(db, "posts", postId);

    try {
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const isPostDisliked = userData?.saved?.dislikedPosts?.includes(postId);

      if (isPostDisliked) {
        await updateDoc(userDocRef, {
          "saved.dislikedPosts": arrayRemove(postId),
        });
        await updateDoc(postDocRef, {
          dislikes: increment(-1),
        });
      } else {
        await updateDoc(userDocRef, {
          "saved.dislikedPosts": arrayUnion(postId),
        });
        await updateDoc(postDocRef, {
          dislikes: increment(1),
        });
      }
    } catch (error) {
      console.error("Error updating dislikes:", error);
    }
  };

  return { handleDownVote };
};

export default useDownVote;

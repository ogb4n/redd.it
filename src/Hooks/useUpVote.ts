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

const useUpVote = () => {
  const { user } = useAuth();

  const handleUpVote = async (postId: string) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const postDocRef = doc(db, "posts", postId);

    try {
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const isPostLiked = userData?.saved?.likedPosts?.includes(postId);

      if (isPostLiked) {
        await updateDoc(userDocRef, {
          "saved.likedPosts": arrayRemove(postId),
        });
        await updateDoc(postDocRef, {
          likes: increment(-1),
        });
      } else {
        await updateDoc(userDocRef, {
          "saved.likedPosts": arrayUnion(postId),
        });
        await updateDoc(postDocRef, {
          likes: increment(1),
        });
      }
    } catch (error: any) {
      console.error(`Error updating likes: ${error.message}`);
    }
  };

  return { handleUpVote };
};

export default useUpVote;

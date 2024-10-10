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

const useUpVote = (postId: string) => {
  const { user } = useAuth();

  const handleUpVote = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const postDocRef = doc(db, "posts", postId);

    try {
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (userData?.likedPosts?.includes(postId)) {
        await updateDoc(userDocRef, {
          likedPosts: arrayRemove(postId),
        });
        await updateDoc(postDocRef, {
          likes: increment(-1),
        });
      } else {
        await updateDoc(userDocRef, {
          likedPosts: arrayUnion(postId),
        });
        await updateDoc(postDocRef, {
          likes: increment(1),
        });
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return { handleUpVote };
};

export default useUpVote;

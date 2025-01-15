import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function attachMediaToPost(postId: string, mediaUrl: string) {
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, { mediaUrl });
}

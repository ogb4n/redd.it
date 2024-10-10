import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { IPost } from "../types";

export const useGetPosts = (subName: string) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, where("subId", "==", subName));
        const snapshot = await getDocs(q);
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IPost[];
        setPosts(postsData);

        const commentsData: { [key: string]: any[] } = {};
        for (const post of postsData) {
          const commentsCollection = collection(db, "comments");
          const q = query(commentsCollection, where("postId", "==", post.id));
          const commentsSnapshot = await getDocs(q);
          commentsData[post.id] = commentsSnapshot.docs.map((doc) =>
            doc.data()
          );
        }
        setComments(commentsData);
      } catch (err) {
        setError("Erreur lors du chargement des posts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [subName]);

  return { posts, loading, error, comments };
};

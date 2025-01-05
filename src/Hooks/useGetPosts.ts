import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { IPost } from "../types";

export const useGetPosts = (subName: string | undefined) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const fetchPosts = async () => {
      if (!subName) {
        setError("Le nom de la sous-catégorie est requis.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, where("subId", "==", "medicine"));
        const snapshot = await getDocs(q);

        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IPost[];

        setPosts(postsData);

        const commentsData: { [key: string]: any[] } = {};
        for (const post of postsData) {
          const commentsCollection = collection(db, "comments");
          const commentsQuery = query(
            commentsCollection,
            where("postId", "==", post.id)
          );
          const commentsSnapshot = await getDocs(commentsQuery);
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

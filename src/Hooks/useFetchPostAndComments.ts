// usePostAndComments.ts
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { IPost } from "../types";

export const useFetchPostAndComments = (
  subId: string | undefined,
  postTitle: string | undefined
) => {
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        const postsQuery = query(
          collection(db, "posts"),
          where("subId", "==", subId),
          where("title", "==", postTitle)
        );
        const postSnapshot = await getDocs(postsQuery);

        if (!postSnapshot.empty) {
          const postData = postSnapshot.docs[0].data();
          setPost({ id: postSnapshot.docs[0].id, ...postData } as IPost);

          const commentsQuery = query(
            collection(db, "comments"),
            where("postId", "==", postSnapshot.docs[0].id)
          );
          const commentsSnapshot = await getDocs(commentsQuery);
          setComments(
            commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        setError("Error loading post and comments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (subId && postTitle) {
      fetchPostAndComments();
    }
  }, [subId, postTitle]);

  return { post, comments, loading, error, setComments };
};

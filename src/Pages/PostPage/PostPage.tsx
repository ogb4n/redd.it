import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { IPost } from "../../types";
import { Post } from "../../Components/Post";

export const PostPage: React.FC = () => {
  const { subName, postTitle } = useParams<{
    subName: string;
    postTitle: string;
  }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const q = query(
          postsCollection,
          where("subId", "==", subName),
          where("title", "==", postTitle)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setPost({
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
          } as IPost);
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        setError("Error loading post.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [subName, postTitle, post?.id]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      {post ? (
        <Post
          key={post.id}
          postId={post.id}
          subId={subName as string}
          title={post.title}
          content={post.content}
          author={post.author}
          likes={post.likes}
        />
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

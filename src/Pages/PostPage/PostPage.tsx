import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { IPost } from "../../types";
import { Post } from "../../Components/Post";
import NotFoundPage from "../NotFoundPage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CommentsList } from "../../Components/CommentsList";
import { Divider } from "@mui/material";
import { Button } from ".././../Components/Shared/Button";
import { FormControl, Stack } from "@mui/joy";
import { useAuth } from "../../utils/AuthContext";
import { BasicModal } from "../../Components/Shared/BasicModal";
import { EditPostForm } from "../../Components/Crud/EditPostForm";
import { Title } from "@mui/icons-material";

export const PostPage: React.FC = () => {
  const { subName, postTitle } = useParams<{
    subName: string;
    postTitle: string;
  }>();
  const { user } = useAuth();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleContentChange = (value: string) => {
    setCommentFormData((prev) => ({ ...prev, content: value }));
  };

  const [commentFormData, setCommentFormData] = useState({
    content: "",
  });

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "comments"), {
        content: commentFormData.content,
        postId: post?.id,
      });
    } catch (err) {
      console.error("Error adding comment: ", err);
    }
  };

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
    <Stack className="p-4">
      {user ? (
        <BasicModal color="bg-accent" labelButton="edit the post">
          <EditPostForm
            initialTitle={post?.title as string}
            initialContent={post?.content as string}
          />
        </BasicModal>
      ) : (
        <div></div>
      )}
      {post ? (
        <>
          <Post
            key={post.id}
            postId={post.id}
            subId={subName as string}
            title={post.title}
            content={post.content}
            author={post.author}
            likes={post.likes}
          />
          <div className="w-96 mx-auto my-4">
            <Divider />
          </div>
          <Stack sx={{ my: 6 }}>
            <CommentsList postId={post.id} comments={[]} />
          </Stack>
          <form onSubmit={handlePostComment}>
            <Stack spacing={2}>
              <FormControl>
                <ReactQuill
                  theme="snow"
                  value={commentFormData.content}
                  onChange={handleContentChange}
                  className="w-full h-28"
                  placeholder="Write a comment..."
                />
              </FormControl>
              <Stack sx={{ my: 6 }}>
                <Button label="post comment" color="bg-accent" type="submit" />
              </Stack>
            </Stack>
          </form>
        </>
      ) : (
        <NotFoundPage />
      )}
    </Stack>
  );
};

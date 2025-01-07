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
import { CustomButton } from "../../Components/Shared/CustomButton";
import { FormControl, Stack } from "@mui/joy";
import { useAuth } from "../../utils/AuthContext";
import { BasicModal } from "../../Components/Shared/BasicModal";

export const PostPage: React.FC = () => {
  const { subId, postTitle } = useParams<{ subId: string; postTitle: string }>();
  const { user } = useAuth();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentFormData, setCommentFormData] = useState({ content: "" });

  const handleContentChange = (value: string) => {
    setCommentFormData((prev) => ({ ...prev, content: value }));
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentFormData.content.trim()) {
      console.error("Comment content cannot be empty.");
      return;
    }
    try {
      await addDoc(collection(db, "comments"), {
        content: commentFormData.content,
        postId: post?.id,
        authorId: user?.uid,
        creationDate: new Date(),
      });
      setCommentFormData({ content: "" });
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
          where("subId", "==", subId),
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
  }, [subId, postTitle]);

  useEffect(() => {
    const fetchComments = async () => {
      if (post) {
        const commentsCollection = collection(db, "comments");
        const q = query(commentsCollection, where("postId", "==", post.id));
        const snapshot = await getDocs(q);
        setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    };

    fetchComments();
  }, [post]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Stack className="p-4">
{user && post?.authorId === user.uid && (
  <BasicModal labelButton="edit the post">
    {/* <EditPostForm
      initialTitle={post?.title as string}
      initialContent={post?.content as string}
      postId={post?.id as string}
      onCancel={() => {}}
    /> */}
    <p>oui</p>
  </BasicModal>
)}

      {post ? (
        <>
          <Post
            key={post.id}
            postId={post.id}
            subId={subId as string}
            title={post.title}
            content={post.content}
            author={post.author}
            likes={post.likes}
          />
          <div className="w-96 mx-auto my-4">
            <Divider />
          </div>
          <Stack sx={{ my: 6 }}>
            <CommentsList postId={post.id} comments={comments} />
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
                <CustomButton label="post comment" color="success" />
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

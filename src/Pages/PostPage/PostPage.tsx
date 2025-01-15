import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { IPost } from "../../types";
import NotFoundPage from "../NotFoundPage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CommentsList } from "../../Components/CommentsList";
import { Divider } from "@mui/material";
import { CustomButton } from "../../Components/Shared/CustomButton";
import { Stack, Button } from "@mui/joy";
import { useAuth } from "../../utils/AuthContext";
import { BasicModal } from "../../Components/Shared/BasicModal";
import { EditPostForm } from "../../Components/Crud/EditPostForm";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import useDownVote from "../../Hooks/useDownVote";
import useUpVote from "../../Hooks/useUpVote";
import useDeletePost from "../../Hooks/useDeletePost";

export const PostPage: React.FC = () => {
  const { subId, postTitle } = useParams<{
    subId: string;
    postTitle: string;
  }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { handleDownVote } = useDownVote();
  const { handleUpVote } = useUpVote();

  const handleDownVoteClick = () => {
    if (post?.id) {
      handleDownVote(post.id);
    }
  };

  const handleUpVoteClick = () => {
    if (post?.id) {
      handleUpVote(post.id);
    }
  };

  const handleDeletePost = async () => {
    useDeletePost(post?.id ?? "").handleDeletePost();
    navigate("/");
  };

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

  useEffect(() => {
    fetchPostAndComments();
  }, [subId, postTitle]);

  const handlePostComment = async (content: string) => {
    if (!content.trim()) return;

    try {
      await addDoc(collection(db, "comments"), {
        content,
        postId: post?.id,
        authorId: user?.uid,
        creationDate: new Date(),
      });
      fetchPostAndComments();
    } catch (err) {
      console.error("Error adding comment: ", err);
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>{error}</div>;

  return post ? (
    <Stack className="p-4">
      <Stack spacing={4} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-black">{post.title}</h1>
        <div
          className="text-gray-700 text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <PostMedia mediaUrls={post.mediaUrls} />
        <PostActions
          post={post}
          user={user}
          onUpVote={handleUpVoteClick}
          onDownVote={handleDownVoteClick}
          onDelete={handleDeletePost}
        />
        <Divider />
      </Stack>
      <Stack sx={{ my: 6 }}>
        <CommentsList postId={post.id} comments={comments} />
      </Stack>
      <CommentForm onSubmit={handlePostComment} />
    </Stack>
  ) : (
    <NotFoundPage />
  );
};

const PostMedia: React.FC<{ mediaUrls: string[] | undefined }> = ({
  mediaUrls,
}) => {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {mediaUrls.map((url, index) => (
        <div key={index} className="w-full">
          {url.endsWith(".mp4") ||
          url.endsWith(".webm") ||
          url.endsWith(".ogg") ? (
            <video src={url} controls className="w-full rounded-lg shadow-md" />
          ) : (
            <img
              src={url}
              alt={`Media ${index + 1}`}
              className="w-full rounded-lg shadow-md"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const PostActions: React.FC<{
  post: IPost;
  user: any;
  onUpVote: () => void;
  onDownVote: () => void;
  onDelete: () => void;
}> = ({ post, user, onUpVote, onDownVote, onDelete }) => {
  return (
    <Stack direction="row" spacing={4} className="mt-4">
      <button onClick={onUpVote}>
        <ThumbUpIcon className="hover:text-secondary" /> {post.likes}
      </button>
      <button onClick={onDownVote}>
        <ThumbDownIcon className="hover:text-error" /> {post.dislikes}
      </button>
      {user && post.authorId === user.uid && (
        <Stack direction="row" spacing={4}>
          <BasicModal labelButton="Edit the post">
            <EditPostForm
              postId={post.id}
              initialTitle={post.title}
              initialContent={post.content}
              initialMediaUrls={post.mediaUrls || []}
              onCancel={() => {}}
              onSubmit={async (
                updatedTitle,
                updatedContent,
                updatedMediaUrls
              ) => {
                await updateDoc(doc(db, "posts", post.id), {
                  title: updatedTitle,
                  content: updatedContent,
                  mediaUrls: updatedMediaUrls,
                });
              }}
            />
          </BasicModal>
          <Button onClick={onDelete}>Delete</Button>
        </Stack>
      )}
    </Stack>
  );
};

const CommentForm: React.FC<{ onSubmit: (content: string) => void }> = ({
  onSubmit,
}) => {
  const [content, setContent] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(content);
        setContent("");
      }}
      className="space-y-4"
    >
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="h-28 text-black"
        placeholder="Write a comment..."
      />
      <CustomButton
        label="Post Comment"
        sx={{
          bgcolor: "#10b981",
          "&:hover": {
            bgcolor: "#059669",
          },
        }}
      />
    </form>
  );
};

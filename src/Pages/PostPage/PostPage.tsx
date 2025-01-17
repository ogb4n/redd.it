import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import NotFoundPage from "../NotFoundPage";
import "react-quill/dist/quill.snow.css";
import { CommentsList } from "../../Components/CommentsList";
import { Stack } from "@mui/material";
import { Button } from "@mui/joy";
import { useAuth } from "../../utils/AuthContext";
import { BasicModal } from "../../Components/Shared/BasicModal";
import { EditPostForm } from "../../Components/Crud/EditPostForm";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import useDownVote from "../../Hooks/useDownVote";
import useUpVote from "../../Hooks/useUpVote";
import useDeletePost from "../../Hooks/useDeletePost";
import { useFetchPostAndComments } from "../../Hooks/useFetchPostAndComments";
import { CreateCommentForm } from "../../Components/Crud/CreateCommentForm";

export const PostPage: React.FC = () => {
  const { subId, postTitle } = useParams<{
    subId: string;
    postTitle: string;
  }>();
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const { post, comments, loading, error, setComments } =
    useFetchPostAndComments(subId, postTitle);

  if (loading) return <Stack>Loading post...</Stack>;
  if (error) return <Stack>{error}</Stack>;

  return post ? (
    <Stack className="p-4">
      <Stack spacing={4} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-black">{post.title}</h1>
        <Stack
          className="text-gray-700 text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <PostMedia mediaUrls={post.mediaUrls} />
        <Stack direction="row" spacing={4} className="mt-4">
          <button onClick={handleUpVoteClick}>
            <ThumbUpIcon className="hover:text-secondary" /> {post.likes}
          </button>
          <button onClick={handleDownVoteClick}>
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
              <Button onClick={handleDeletePost}>Delete</Button>
            </Stack>
          )}
        </Stack>
        <Stack />
      </Stack>
      <Stack sx={{ my: 6 }}>
        <CommentsList postId={post.id} comments={comments} />
      </Stack>
      <Stack>
        <CreateCommentForm postId={post.id} userId={user?.uid} />
      </Stack>
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
    <Stack className="flex flex-wrap gap-4">
      {mediaUrls.map((url, index) => (
        <Stack key={url} className="w-full">
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
        </Stack>
      ))}
    </Stack>
  );
};

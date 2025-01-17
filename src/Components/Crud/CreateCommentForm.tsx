import { CustomButton } from "../../Components/Shared/CustomButton";
import ReactQuill from "react-quill";
import React, { useState } from "react";
import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";

interface CommentFormProps {
  postId: string | undefined;
  userId: string | undefined;
}

export const CreateCommentForm: React.FC<CommentFormProps> = ({
  postId,
  userId,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postId || !userId) {
      throw new Error("Post ID and User ID are required.");
    }

    try {
      const commentData = {
        postId,
        content,
        authorId: userId,
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "comments"), commentData);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="h-28 text-black"
        placeholder="Write a comment..."
      />
      {/* {error && <div className="text-red-500">{error}</div>} */}
      <CustomButton
        type="submit"
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

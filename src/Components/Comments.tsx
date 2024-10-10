import React from "react";

interface Comment {
  content: string;
  author: string;
}

interface CommentsProps {
  postId: string;
  comments: Comment[];
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <div>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.content}</p>
              <p>By {comment.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

import React from "react";
import parse from "react-html-parser";

interface Comment {
  id: string;
  subName: string;
  content: string;
  author: string;
}

interface CommentsProps {
  postId: string;
  comments: Comment[];
}

export const CommentsList: React.FC<CommentsProps> = ({ comments, postId }) => {
  return (
    <div>
      {comments.length === 0 ? (
        <p className="text-sm">No comments yet.</p>
      ) : (
        <ul className="">
          {comments.map((comment, index) => (
            <li key={comment.id}>
              <p className="text-md">{parse(comment.content)}</p>
              <p className="text-sm">By {comment.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

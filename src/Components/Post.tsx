import React from "react";

interface PostProps {
  subId: string;
  title: string;
  postId: string;
  content: string;
  images?: string[];
  author: string;
  likes: number;
}

export const Post: React.FC<PostProps> = ({
  title,
  content,
  author,
  likes,
  subId,
}) => {
  return (
    <>
      <div>
        <div className="p-4">
          {" "}
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600 mt-2">{content}</p>
          <p className="text-sm text-gray-500 mt-2">By {author}</p>
          <p className="text-sm text-gray-500 mt-2">{likes} likes</p>
        </div>
      </div>
    </>
  );
};

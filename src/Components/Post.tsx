import React from "react";
import parse from "react-html-parser";
import { Link } from "react-router-dom";
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
  postId,
  images,
}) => {
  return (
    <div>
      <div className="p-4">
        {" "}
        <h2 className="text-black font-bold text-2xl">{title}</h2>
        <p className="text-lg mt-2 text-black">{parse(content)}</p>
        <p className="text-sm text-gray-500 mt-2">
          from <Link to={`/profile/${author}`}>{author}</Link>
        </p>
        <p className="text-sm text-gray-500 mt-2">{likes} likes</p>
      </div>
    </div>
  );
};

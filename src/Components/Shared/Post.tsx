import React from "react";

interface PostProps {
  subId: string;
  title: string;
  content: string;
  images?: string[];
  author: string;
  likes: number;
}

const Post: React.FC<PostProps> = () => {
  return (
    <>
      <div></div>
    </>
  );
};

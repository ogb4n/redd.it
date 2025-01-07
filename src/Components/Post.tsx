import React from "react";
import parse from "react-html-parser";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { Link } from "react-router-dom";
import Typography from '@mui/joy/Typography';
import { PostInteractBar } from "../Components/PostInteractBar";


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
      <Card sx={{ padding: 4 }}>
        <Typography fontSize={20} fontWeight={"bold"}>{title}</Typography>
        <Typography fontSize={16}>{parse(content)}</Typography>
        <CardContent className="text-sm text-gray-500 mt-2">
          from <Link to={`/profile/${author}`}>{author}</Link>
        </CardContent>
        <Typography className="text-sm text-gray-500 mt-2">{likes} likes</Typography>
          <PostInteractBar
            subId={subId}
            postName={title}
          />
      </Card>
  );
};
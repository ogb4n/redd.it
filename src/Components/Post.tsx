import React from "react";
import parse from "react-html-parser";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import { PostInteractBar } from "../Components/PostInteractBar";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../utils/firebase";

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
  const [postData] = useDocumentData(doc(db, "posts", postId));
  const currentLikes = postData?.likes ?? likes;
  return (
    <Card sx={{ padding: 4, backgroundColor: "white" }}>
      <Typography textColor={"black"} fontSize={20} fontWeight={"bold"}>
        {title}
      </Typography>
      <Typography textColor={"grey"} fontSize={16}>
        {parse(content)}
      </Typography>
      <CardContent className="text-[#333632] text-sm mt-2 ">
        from{" "}
        <Link className="hover:text-secondary" to={`/profile/${author}`}>
          {author}
        </Link>
      </CardContent>
      <Typography textColor={"grey"} fontSize={16}>
        {currentLikes} likes
      </Typography>
      <PostInteractBar subId={subId} postId={postId} />
    </Card>
  );
};

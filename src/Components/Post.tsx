import React from "react";
import parse from "react-html-parser";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Link, useLocation } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import { PostInteractBar } from "../Components/PostInteractBar";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Box } from "@mui/system";

interface PostProps {
  subId: string;
  title: string;
  postId: string;
  content: string;
  author: string;
  likes: number;
  mediaUrls?: string[];
}

export const Post: React.FC<PostProps> = ({
  title,
  content,
  author,
  likes,
  subId,
  postId,
  mediaUrls = [],
}) => {
  const location = useLocation();
  const isPostPage = location.pathname === `/post/${postId}`;
  const [postData] = useDocumentData(doc(db, "posts", postId));
  const currentLikes = postData?.likes ?? likes;
  const currentMediaUrls = postData?.mediaUrls ?? mediaUrls;

  return (
    <Card sx={{ padding: 4, backgroundColor: "white" }}>
      <Typography textColor={"black"} fontSize={20} fontWeight={"bold"}>
        {title}
      </Typography>
      <Typography textColor={"grey"} fontSize={16}>
        {parse(content)}
      </Typography>
      {currentMediaUrls.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginTop: 2,
            flexWrap: "wrap",
            justifyContent: isPostPage ? "center" : "flex-start",
          }}
        >
          {currentMediaUrls.map((url: string, index: any) => (
            <Box
              key={url}
              sx={{
                width: isPostPage ? "100%" : "100px",
                maxWidth: isPostPage ? "500px" : "100px",
                height: isPostPage ? "auto" : "100px",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {url.endsWith(".mp4") ||
              url.endsWith(".webm") ||
              url.endsWith(".ogg") ? (
                <video
                  src={url}
                  controls
                  style={{
                    width: isPostPage ? "100%" : "100px",
                    height: isPostPage ? "auto" : "100px",
                  }}
                />
              ) : (
                <img
                  src={url}
                  alt={`media-${index}`}
                  style={{
                    width: isPostPage ? "100%" : "100px",
                    height: isPostPage ? "auto" : "100px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
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

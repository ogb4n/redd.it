import React from "react";
import parse from "react-html-parser";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/joy/styles";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography["body-sm"],
  padding: theme.spacing(2),
  borderRadius: 8,
  color: theme.vars.palette.text.secondary,
  maxWidth: 600,
  backgroundColor: "#fafafb",
  position: "relative",
  transition: "background-color 0.3s ease",
  '&:hover': {
    backgroundColor: "#f0f0f2",
  }
}));

const ButtonsContainer = styled(Stack)(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  visibility: "hidden",
  opacity: 0,
  transition: "visibility 0.3s, opacity 0.3s",
  '&:hover': {
    visibility: "visible",
    opacity: 1,
  }
}));

const ItemWithHover = styled(Item)(({ theme }) => ({
  '&:hover .buttons-container': {
    visibility: "visible",
    opacity: 1,
  }
}));

interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
}

interface CommentsProps {
  postId: string;
  comments: Comment[];
}

export const CommentsList: React.FC<CommentsProps> = ({ comments, postId }) => {
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
      {comments.length === 0 ? (
        <Typography level="body-sm" textAlign="center" color="neutral">
          No comments yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {comments.map((comment) => (
            <ItemWithHover sx={{ bgcolor: "#fafafb", mt: 2 }} key={comment.id}>
              <Stack spacing={2} direction="row" alignItems="center">
                <ButtonsContainer className="buttons-container" spacing={1} alignItems="center">
                  <IconButton size="sm" color="neutral">
                    <ThumbUp fontSize="small" />
                  </IconButton>
                  <IconButton size="sm" color="neutral">
                    <ThumbDown fontSize="small" />
                  </IconButton>
                </ButtonsContainer>
                <Avatar>{comment.author.charAt(0).toUpperCase()}</Avatar>
                <Stack sx={{ minWidth: 0 }}>
                  <Typography fontWeight="md">{comment.author}</Typography>
                  <Typography level="body-sm" noWrap>
                    {parse(comment.content)}
                  </Typography>
                </Stack>
              </Stack>
            </ItemWithHover>
          ))}
        </Stack>
      )}
    </Box>
  );
};

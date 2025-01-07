import React from "react";
import parse from "react-html-parser";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/joy/styles";

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography["body-sm"],
  padding: theme.spacing(2),
  borderRadius: 8,
  color: theme.vars.palette.text.secondary,
  maxWidth: 600,
  backgroundColor: theme.vars.palette.background.level1,
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
            <Item sx={{bgcolor:"white", mt:2}} key={comment.id}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Avatar>{comment.author.charAt(0).toUpperCase()}</Avatar>
                <Stack sx={{ minWidth: 0 }}>
                  <Typography fontWeight="md">
                    {comment.author}
                  </Typography>
                  <Typography level="body-sm" noWrap>
                    {parse(comment.content)}
                  </Typography>
                </Stack>
              </Stack>
            </Item>
          ))}
        </Stack>
      )}
    </Box>
  );
};

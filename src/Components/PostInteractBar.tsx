import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate, useLocation } from "react-router-dom";
import useUpVote from "../Hooks/useUpVote";
import useDownVote from "../Hooks/useDownVote";
import { Stack } from "@mui/material";
import { Button } from "@mui/joy";
interface BarProps {
  postId: string;
  subId: string;
}

export const PostInteractBar: React.FC<BarProps> = ({ postId, subId }) => {
  const { handleUpVote } = useUpVote();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickCommentButton = () => {
    const postUrl = `/r/${subId}/${postId}`;
    if (location.pathname !== postUrl) {
      navigate(postUrl);
    }
  };

  const handleUpVoteClick = () => {
    handleUpVote(postId);
  };

  return (
    <Stack className="w-[35%] mx-auto bg-white rounded-full">
      <Stack direction={"row"} spacing={2}>
        <button onClick={handleUpVoteClick}>
          <ThumbUpIcon className="hover:text-secondary" />
        </button>
        <button onClick={useDownVote}>
          <ThumbDownIcon className="hover:text-error" />
        </button>
        <button onClick={handleClickCommentButton}>
          <ChatIcon />
        </button>
      </Stack>
    </Stack>
  );
};

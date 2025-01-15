import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate, useLocation } from "react-router-dom";
import useUpVote from "../Hooks/useUpVote";
import useDownVote from "../Hooks/useDownVote";

interface BarProps {
  postId: string;
  subId: string;
}

export const PostInteractBar: React.FC<BarProps> = ({ postId, subId }) => {
  const { handleUpVote } = useUpVote(postId);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickCommentButton = () => {
    const postUrl = `/r/${subId}/${postId}`;
    if (location.pathname !== postUrl) {
      navigate(postUrl);
    }
  };

  return (
    <div className="w-[35%] mx-auto bg-white rounded-full">
      <div className="flex items-center justify-around">
        <button onClick={handleUpVote}>
          <ThumbUpIcon className="hover:text-secondary" />
        </button>
        <button onClick={useDownVote}>
          <ThumbDownIcon className="hover:text-error" />
        </button>
        <button onClick={handleClickCommentButton}>
          <ChatIcon />
        </button>
      </div>
    </div>
  );
};

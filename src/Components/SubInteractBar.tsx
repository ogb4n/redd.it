import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../utils/firebase";
import { CustomButton } from "../Components/Shared/CustomButton";
import { BasicModal } from "./Shared/BasicModal";
import { CreatePostForm } from "./Crud/CreatePostForm";
import { Stack } from "@mui/material";

interface BarProps {
  subId: string;
  user: User | null;
  isFollowed: boolean;
  onFollowChange: (isFollowed: boolean) => void;
}

export const SubInteractBar: React.FC<BarProps> = ({
  subId,
  user,
  isFollowed: initialIsFollowed,
  onFollowChange,
}) => {
  const [isFollowed, setIsFollowed] = useState(initialIsFollowed);

  useEffect(() => {
    setIsFollowed(initialIsFollowed);
  }, [initialIsFollowed]);

  const handleToggleFollow = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);

    try {
      if (isFollowed) {
        await updateDoc(userDocRef, {
          "saved.followedSubs": arrayRemove(subId),
        });
        setIsFollowed(false);
        onFollowChange(false);
      } else {
        await updateDoc(userDocRef, {
          "saved.followedSubs": arrayUnion(subId),
        });
        setIsFollowed(true);
        onFollowChange(true);
      }
    } catch (error) {
      console.error("Error updating followedSubs:", error);
    }
  };

  return (
    <Stack className="ml-auto gap-2 grid grid-cols-2">
      <BasicModal
        labelButton="Create a post"
        bgcolor="#10b981"
        hoverBgcolor="#059669"
      >
        <CreatePostForm user={user} subId={subId} close={() => {}} />
      </BasicModal>
      <CustomButton
        type="button"
        sx={{
          bgcolor: isFollowed ? "#ba0b0b" : "#10b981",
          "&:hover": {
            bgcolor: isFollowed ? "#a10a0a" : "#059669",
          },
        }}
        onClick={handleToggleFollow}
        label={isFollowed ? "Leave" : "Join"}
      ></CustomButton>
    </Stack>
  );
};

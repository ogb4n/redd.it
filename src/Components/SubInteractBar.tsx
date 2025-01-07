import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../utils/firebase";
import Button from "@mui/joy/Button";
import { BasicModal } from "./Shared/BasicModal";
import { CreatePostForm } from "./Crud/CreatePostForm";

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
    <div className="ml-auto gap-2 grid grid-cols-2">
      <BasicModal labelButton="Create a post">
        <CreatePostForm user={user} subId={subId} close={() => {}} />
      </BasicModal>
      <Button
        color={isFollowed ? "danger" : "success"}
        onClick={handleToggleFollow}
      >
        {isFollowed ? "Leave" : "Join"}
      </Button>
    </div>
  );
};

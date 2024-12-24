import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Button } from "../Components/Shared/Button";
import { BasicModal } from "./Shared/BasicModal";
import { CreatePostForm } from "./Crud/CreatePostForm";

interface BarProps {
  subName: string;
  user: User | null;
  isFollowed: boolean;
  onFollowChange: (isFollowed: boolean) => void;
}

export const SubInteractBar: React.FC<BarProps> = ({
  subName,
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
          "saved.followedSubs": arrayRemove(subName),
        });
        setIsFollowed(false);
        onFollowChange(false);
      } else {
        await updateDoc(userDocRef, {
          "saved.followedSubs": arrayUnion(subName),
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
        <CreatePostForm user={user} subName={subName} close={() => {}} />
      </BasicModal>
      <Button
        color={isFollowed ? "bg-red-500" : "bg-secondary"}
        label={isFollowed ? "Leave" : "Join"}
        onClick={handleToggleFollow}
      />
    </div>
  );
};

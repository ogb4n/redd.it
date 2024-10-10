import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPosts } from "../../Hooks/useGetPosts";
import { Post } from "../../Components/Post";
import { InteractBar } from "../../Components/InteractBar";
import { Comments } from "../../Components/Comments";
import Button from "@mui/joy/Button";
import { Divider } from "@mui/material";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useAuth } from "../../utils/AuthContext";

export const SubPage: React.FC = () => {
  const { subName } = useParams<{ subName: string }>();
  const { posts, loading, error, comments } = useGetPosts(subName as string);
  const { user } = useAuth();

  const handleJoinSub = async (subName: string) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userDocRef, {
        followedSubs: arrayUnion(subName),
      });
    } catch (error) {
      console.error("Error joining sub:", error);
    }
  };

  const handleCreatePost = () => {
    console.log("Create post");
  };

  if (loading) return <div>Loading posts..</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 ">
      <div className="flex w-full">
        <h1 className="text-2xl font-bold mb-4">Posts in r/{subName}</h1>
        {subName != "popular" && (
          <div className="ml-[8rem]">
            {" "}
            <Button variant="outlined" onClick={handleCreatePost}>
              Create a post
            </Button>
            <Button onClick={() => handleJoinSub(subName as string)}>
              Join
            </Button>
          </div>
        )}
      </div>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className="space-y-4 ">
          {posts.map((post) => (
            <div key={post.id}>
              <Link to={`/r/${subName}/${post.title}`}>
                <Post
                  postId={post.id}
                  subId={subName as string}
                  title={post.title}
                  content={post.content}
                  author={post.author}
                  likes={post.likes}
                />
              </Link>
              <InteractBar subName={subName as string} postName={post.title} />
              <Comments
                postId={post.title}
                comments={comments[post.id] || []}
              />
              <div className="my-12">
                <Divider />
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

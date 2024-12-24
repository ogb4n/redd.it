import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import { useAuth } from "../../utils/AuthContext";
import { Post } from "../../Components/Post";
import { PostInteractBar } from "../../Components/PostInteractBar";
import { CommentsList } from "../../Components/CommentsList";
import { SubInteractBar } from "../../Components/SubInteractBar";
import useFetchFollowedSubs from "../../Hooks/useFetchFollowedSubs";
import { useGetPosts } from "../../Hooks/useGetPosts";

export const SubPage: React.FC = () => {
  const { subName } = useParams<{ subName: string }>();
  const { posts, loading, error, comments } = useGetPosts(subName as string);
  const { user } = useAuth();
  const {
    subs: followedSubs,
    loading: subsLoading,
    error: subsError,
  } = useFetchFollowedSubs(user); // Utilisation correcte du hook
  const [isFollowed, setIsFollowed] = useState(false);

  // Vérifie si le sub est suivi lorsqu'on change `subName` ou que `followedSubs` est mis à jour
  useEffect(() => {
    if (!user || subsLoading || subsError) return;
    setIsFollowed(followedSubs.includes(subName ?? ""));
  }, [subName, user, followedSubs, subsLoading, subsError]);

  const handleFollowChange = (followed: boolean) => {
    setIsFollowed(followed);
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts: {error}</div>;
  if (subsError)
    return <div>Error fetching followed subs: {subsError.message}</div>;

  return (
    <div className="p-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Posts in r/{subName}</h1>
        {subName !== "popular" && (
          <SubInteractBar
            user={user}
            subName={subName as string}
            isFollowed={isFollowed}
            onFollowChange={handleFollowChange}
          />
        )}
      </div>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className="space-y-4">
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
              <PostInteractBar
                subName={subName as string}
                postName={post.title}
              />
              <CommentsList
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

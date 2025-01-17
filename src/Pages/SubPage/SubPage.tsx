import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { useAuth } from "../../utils/AuthContext";
import { Post } from "../../Components/Post";
import { CommentsList } from "../../Components/CommentsList";
import { SubInteractBar } from "../../Components/SubInteractBar";
import useFetchFollowedSubs from "../../Hooks/useFetchFollowedSubs";
import { useFetchPosts } from "../../Hooks/useFetchPosts";
import { List, ListItem } from "@mui/joy";

export const SubPage: React.FC = () => {
  const location = useLocation();
  const subName = location.pathname.split("/").pop();
  const { user } = useAuth();
  const [isFollowed, setIsFollowed] = useState(false);

  const { posts, loading, error, comments } = useFetchPosts(subName);

  const {
    subs: followedSubs,
    loading: subsLoading,
    error: subsError,
  } = useFetchFollowedSubs(user);

  useEffect(() => {
    if (!user || subsLoading || subsError || !subName) return;
    setIsFollowed(followedSubs.includes(subName));
  }, [subName, user, followedSubs, subsLoading, subsError]);

  const handleFollowChange = (followed: boolean) => {
    setIsFollowed(followed);
  };

  if (!subName) return <Stack>Error: SubName is not defined.</Stack>;
  if (loading) return <Stack>Loading posts...</Stack>;
  if (error) return <Stack>Error loading posts: {error}</Stack>;
  if (subsError)
    return <Stack>Error fetching followed subs: {subsError.message}</Stack>;

  return (
    <Stack className="p-4">
      <Stack className="flex w-full items-center justify-between">
        <Typography className="text-2xl text-black font-bold mb-4">
          Posts in r/{subName}
        </Typography>
        {subName !== "popular" && (
          <SubInteractBar
            user={user}
            subId={subName}
            isFollowed={isFollowed}
            onFollowChange={handleFollowChange}
          />
        )}
      </Stack>

      {posts.length === 0 ? (
        <Typography>No posts found.</Typography>
      ) : (
        <List className="space-y-4">
          <ListItem>
            {posts.map((post) => (
              <Stack className="mt-6" key={post.id}>
                <Link to={`/r/${subName}/${post.title}`}>
                  <Post
                    postId={post.id}
                    subId={subName}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    likes={post.likes}
                  />
                </Link>
                <CommentsList
                  postId={post.id}
                  comments={comments[post.id] || []}
                />
                <Stack className="my-12">
                  <Stack />
                </Stack>
              </Stack>
            ))}
          </ListItem>
        </List>
      )}
    </Stack>
  );
};

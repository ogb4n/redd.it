import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";
import { useAuth } from "../../utils/AuthContext";
import { Post } from "../../Components/Post";
import { PostInteractBar } from "../../Components/PostInteractBar";
import { CommentsList } from "../../Components/CommentsList";
import { SubInteractBar } from "../../Components/SubInteractBar";
import useFetchFollowedSubs from "../../Hooks/useFetchFollowedSubs";
import { useGetPosts } from "../../Hooks/useGetPosts";

export const SubPage: React.FC = () => {
  const location = useLocation();
  const subName = location.pathname.split("/").pop();
  const { user } = useAuth();
    console.log('subName:', subName);
    // État local pour vérifier si le sub est suivi
  const [isFollowed, setIsFollowed] = useState(false);

  // Gestion des posts uniquement si `subName` est valide
  const { posts, loading, error, comments } = useGetPosts(subName);

  // Gestion des subs suivis
  const {
    subs: followedSubs,
    loading: subsLoading,
    error: subsError,
  } = useFetchFollowedSubs(user);

  // Vérifie si le sub est suivi lorsqu'on change `subName` ou que `followedSubs` est mis à jour
  useEffect(() => {
    if (!user || subsLoading || subsError || !subName) return;
    setIsFollowed(followedSubs.includes(subName));
  }, [subName, user, followedSubs, subsLoading, subsError]);

  const handleFollowChange = (followed: boolean) => {
    setIsFollowed(followed);
  };

  // Gestion des cas où subName est invalide ou des erreurs de chargement
  if (!subName) return <div>Error: SubName is not defined.</div>;
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
            subId={subName}
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
                  subId={subName}
                  title={post.title}
                  content={post.content}
                  author={post.author}
                  likes={post.likes}
                />
              </Link>
              <PostInteractBar
                subId={subName}
                postName={post.title}
              />
              <CommentsList
                postId={post.id}
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

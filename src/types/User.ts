export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  verified: boolean;
  photoURL: string;
  creationDate: Date;
  saved: {
    followedSubs: [];
    likedPosts: [];
    dislikedPosts: [];
    savedPosts: [];
    followedUsers: [];
  };
}

import { api } from "../utils/api";
import { LoadingSpinner } from "./LoadingSpinner";

export const ProfileFeed = ({ userId }: { userId: string }) => {
  const { data: posts, isLoading: isLoadingPosts } =
    api.posts.getPostsByUserId.useQuery({
      userId,
    });

  if (isLoadingPosts)
    return (
      <div className="h-full">
        <LoadingSpinner size={40} />
      </div>
    );

  if (!posts) return <div>Something went wrong</div>;
  if (!posts?.length) return <div>No posts yet</div>;

  return <div>{}</div>;
};

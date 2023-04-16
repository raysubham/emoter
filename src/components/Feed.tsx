import { LoadingSpinner } from "~/components/LoadingSpinner";
import { api } from "~/utils/api";
import { PostView } from "~/components/PostView";

export const Feed = () => {
  const { data, isLoading: isPostsLoading } = api.posts.getAll.useQuery();

  if (isPostsLoading)
    return (
      <div className="h-full">
        <LoadingSpinner size={40} />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;
  if (!data?.length) return <div>No posts yet</div>;

  return (
    <div className="flex flex-col">
      {data?.map(({ post, author }) => (
        <PostView key={post.id} post={post} author={author} />
      ))}
    </div>
  );
};

import { NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageLayout } from "../components/PageLayout";
import Image from "next/image";
import { PostView } from "../components/PostView";
import { useRouter } from "next/router";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const profile = router.query?.profile as string;
  const username = profile?.replace("@", "");

  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username,
  });

  const { data: posts, isLoading: isLoadingPosts } =
    api.posts.getPostsByUserId.useQuery({
      userId: "user_2OVH22FHj351UU51Z8O4Iz6ErGU",
    });

  if (isLoading)
    return (
      <div className="h-screen">
        <LoadingSpinner size={60} />
      </div>
    );

  if (!data) return <div>404 User not found</div>;

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <PageLayout>
        <div className="relative h-48 bg-slate-500">
          <Image
            src={data?.profileImageUrl}
            height={96}
            width={96}
            alt="Profile Picture"
            className="absolute bottom-0 left-4 -mb-12 rounded-full border-4 border-solid border-black"
          />
        </div>
        <div className="mt-16 ml-4 text-xl font-semibold">
          @{data?.username}
        </div>
        <div className="mt-6 border-b border-slate-400" />

        <div className="flex h-full flex-col">
          {isLoadingPosts && (
            <div className="flex h-full items-center justify-center">
              <LoadingSpinner size={40} />
            </div>
          )}
          {posts?.map(({ post, author }) => (
            <PostView key={post.id} post={post} author={author} />
          ))}
        </div>
      </PageLayout>
      ;
    </>
  );
};

export default ProfilePage;

import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { RouterOutputs, api } from "~/utils/api";
import { PostView } from "~/components/PostView";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { PageLayout } from "../../components/PageLayout";

type PostType = RouterOutputs["posts"]["getById"];

const PostPage: NextPage = () => {
  const router = useRouter();
  const id = router.query?.id as string;

  const { data, isLoading: isLoadingPost } = api.posts.getById.useQuery({
    id,
  });

  if (isLoadingPost)
    return (
      <div className="h-screen">
        <LoadingSpinner size={60} />
      </div>
    );

  if (!data?.post || !data.author) return <div>Post not found</div>;

  return (
    <>
      <Head>
        <title>Emoter</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <PostView post={data.post} author={data.author} />
      </PageLayout>
    </>
  );
};

export default PostPage;
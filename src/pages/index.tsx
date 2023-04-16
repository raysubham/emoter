import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import { CreatePostWizard } from "~/components/CreatePostWizard";
import { PostView } from "../components/PostView";

const Home: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data?.length) return <div>No posts yet</div>;

  return (
    <>
      <Head>
        <title>Emoter</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b p-4">
            {!user.isSignedIn && <SignInButton />}
            {Boolean(user.isSignedIn) && <CreatePostWizard />}
          </div>
          <div className="flex flex-col">
            {data?.map(({ post, author }) => (
              <PostView key={post.id} post={post} author={author} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

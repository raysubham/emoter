import { NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageLayout } from "../components/PageLayout";
import Image from "next/image";

const ProfilePage: NextPage = () => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username: "raysubham",
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
            className="absolute bottom-0 left-4 -mb-12 rounded-full border-2 border-solid border-black"
          />
        </div>
        <div className="mt-16 ml-4 text-xl font-semibold">
          @{data?.username}
        </div>
        <div className="mt-2 border-b border-slate-400" />
      </PageLayout>
      ;
    </>
  );
};

export default ProfilePage;

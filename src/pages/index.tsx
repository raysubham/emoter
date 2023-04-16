import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

import { CreatePostWizard } from "~/components/CreatePostWizard";

import { Feed } from "~/components/Feed";
import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { PageLayout } from "../components/PageLayout";

const Home: NextPage = () => {
  const { isSignedIn, isLoaded } = useUser();

  // Start the query immediately
  api.posts.getAll.useQuery();

  if (!isLoaded)
    return (
      <div className="h-screen">
        <LoadingSpinner size={60} />
      </div>
    );

  return (
    <PageLayout>
      <div className="flex border-b p-4">
        {!isSignedIn && <SignInButton />}
        {Boolean(isSignedIn) && <CreatePostWizard />}
      </div>
      <Feed />
    </PageLayout>
  );
};

export default Home;

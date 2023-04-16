import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export const CreatePostWizard = () => {
  const user = useUser();

  if (user.isSignedIn) {
    return (
      <div className="flex w-full gap-4">
        <Image
          src={user.user.profileImageUrl}
          alt="Profile Image"
          className="rounded-full"
          width={48}
          height={48}
          placeholder="blur"
        />
        <input
          placeholder="What's on your mind?"
          className="grow bg-transparent outline-none"
        />
      </div>
    );
  }

  return null;
};

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";

export const CreatePostWizard = () => {
  const [content, setContent] = useState<string>("");
  const user = useUser();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation();
  const apiCtx = api.useContext();

  const handleSubmit = () => {
    if (content.length > 0) {
      mutate(
        { content },
        {
          onSuccess: () => {
            void apiCtx.posts.getAll.invalidate();
            setContent("");
          },
        }
      );
    }
  };

  if (user.isSignedIn) {
    return (
      <div className="flex w-full gap-4">
        <Image
          src={user.user.profileImageUrl}
          alt="Profile Image"
          className="rounded-full"
          width={48}
          height={48}
        />
        <input
          placeholder="What's on your mind?"
          className="grow bg-transparent outline-none"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPosting}
        />
        <button className="font-semibold" onClick={handleSubmit}>
          Post
        </button>
      </div>
    );
  }

  return null;
};

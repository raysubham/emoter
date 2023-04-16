import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/LoadingSpinner";

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
          onError: (error) => {
            const errorMessage = error.data?.zodError?.fieldErrors;
            if (errorMessage?.content && errorMessage.content?.[0]) {
              toast.error(errorMessage.content?.[0]);
            } else {
              toast.error("Something went wrong. Please try again later.");
            }
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
        {!isPosting && Boolean(content) && (
          <button className="font-semibold" onClick={handleSubmit}>
            Post
          </button>
        )}
        {isPosting && <LoadingSpinner size={20} />}
      </div>
    );
  }

  return null;
};

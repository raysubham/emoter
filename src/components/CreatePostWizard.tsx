import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/LoadingSpinner";

export const CreatePostWizard = () => {
  const [contentText, setContentText] = useState<string>("");
  const user = useUser();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation();
  const apiCtx = api.useContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (contentText.length > 0) {
      mutate(
        { content: contentText },
        {
          onSuccess: () => {
            void apiCtx.posts.getAll.invalidate();
            setContentText("");
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
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center justify-center"
        >
          <input
            placeholder="What's on your mind?"
            className="grow bg-transparent outline-none"
            type="text"
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            disabled={isPosting}
          />
          {!isPosting && Boolean(contentText) && (
            <button
              type="submit"
              className="font-semibold"
              onClick={handleSubmit}
            >
              Post
            </button>
          )}
          {isPosting && <LoadingSpinner size={20} />}
        </form>
      </div>
    );
  }

  return null;
};

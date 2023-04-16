import { RouterOutputs } from "../utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

type PostViewPropsType = RouterOutputs["posts"]["getAll"][number];

export const PostView = ({ post, author }: PostViewPropsType) => {
  return (
    <div className="flex items-center gap-4 border-b border-slate-400 p-6">
      <Image
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        src={author?.profileImageUrl!}
        alt="Profile Image"
        className="rounded-full"
        width={48}
        height={48}
        placeholder="blur"
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="text-lg font-semibold">@{author?.username}</span>
          <span className="font-thin">
            {" "}
            . {dayjs(post.createdAt).fromNow()}
          </span>
        </div>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

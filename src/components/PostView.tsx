import { type RouterOutputs } from "../utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(relativeTime);

type PostViewPropsType = RouterOutputs["posts"]["getAll"][number];

export const PostView = ({ post, author }: PostViewPropsType) => {
  return (
    <div className="flex items-center gap-4 border-b border-slate-400 p-4">
      <Link href={`/@${author.username || ""}`}>
        <Image
          src={author?.profileImageUrl}
          alt="Profile Image"
          className="rounded-full"
          width={48}
          height={48}
        />
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Link href={`/@${author.username || ""}`}>
            <span className="text-lg font-semibold">@{author?.username}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="font-thin">
              {" "}
              . {dayjs(post.createdAt).fromNow()}
            </span>
          </Link>
        </div>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

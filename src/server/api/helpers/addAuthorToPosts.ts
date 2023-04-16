import { clerkClient } from "@clerk/nextjs/server";
import { type Post } from "@prisma/client";
import { filterUserForClient } from "./filterUserForClient";
import { TRPCError } from "@trpc/server";

export const addAuthorToPosts = async (posts: Post[]) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100,
    })
  ).map(filterUserForClient);

  return posts.map((post) => {
    const author = users.find((user) => user.id === post.authorId);

    if (!author)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Author not found",
      });

    return {
      post,
      author,
    };
  });
};

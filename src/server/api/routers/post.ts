import { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const limit = 100;

    const posts = await ctx.prisma.post.findMany({
      take: limit,
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit,
      })
    ).map((user: User) => {
      return {
        id: user.id,
        username: user.username,
        profileImageUrl: user.profileImageUrl,
      };
    });

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      return {
        post,
        author,
      };
    });
  }),
});

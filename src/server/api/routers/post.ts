import { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const limit = 100;

    const posts = await ctx.prisma.post.findMany({
      take: limit,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
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
  }),
  create: privateProcedure
    .input(
      z.object({
        content: z.string().emoji("Only emojis are allowed").min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { content } = input;
      const authorId = ctx.userId;

      const post = await ctx.prisma.post.create({
        data: {
          content,
          authorId,
        },
      });

      return post;
    }),
});

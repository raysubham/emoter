import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { addAuthorToPosts } from "../helpers/addAuthorToPosts";

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

    return addAuthorToPosts(posts);
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
  getPostsByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const posts = await ctx.prisma.post.findMany({
        where: {
          authorId: userId,
        },
        take: 100,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });

      return addAuthorToPosts(posts);
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const post = await ctx.prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      return (await addAuthorToPosts([post]))[0];
    }),
});

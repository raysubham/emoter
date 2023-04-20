import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../root";
import superjson from "superjson";
import { prisma } from "../../db";

export const generateServerSideHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });

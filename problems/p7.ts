import { log } from "console";
import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const test = await prisma.starRating.aggregate({
    _avg: {
      score: true
    },
    where: {
      userId: userId
    }
  });
  return test._avg.score
};

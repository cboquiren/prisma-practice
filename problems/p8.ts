import { maxBy, minBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const test = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true
    }
  });
  const sort = test.sort((a,b) => {
    return (a._avg.score ?? 0) - (b._avg.score ?? 0);
  });
  return sort[0].userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const test = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true
    }
  });
  const sort = test.sort((a,b) => {
    return (b._avg.score ?? 0) - (a._avg.score ?? 0);
  })
  return sort[0].userId;
};

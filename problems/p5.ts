
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const test = await prisma.starRating.groupBy({
    by: ["movieId"],
    having: {
      score: {
        _avg: {
          gt: n
        }
      },
    },
  });
  const map = test.map((obj) => obj.movieId);
  return await prisma.movie.findMany({
    where: {
      id: {in: map}
    }
  });
};

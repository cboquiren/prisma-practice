import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const test = await prisma.starRating.findMany({
    where: {
      userId: userId
    },
    select: {
      movieId: true
    }
  });
  const map = test.map((movie) => movie.movieId);
  return await prisma.movie.findMany({
    where: {
      id: {in: map}
    }
  });
};

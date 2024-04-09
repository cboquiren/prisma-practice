import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const usersUnder = await prisma.user.findMany({
    where: {
      age: {
        lt: n
      }
    }
  });
  const userIdsToDelete = usersUnder.map((user) => user.id);

  const deletePosts = await prisma.starRating.deleteMany({
    where: {
      userId: {in: userIdsToDelete}
    }
  });

  const deleteUsers = await prisma.user.deleteMany({
    where: {
      id: {in: userIdsToDelete}
    }
  });
};

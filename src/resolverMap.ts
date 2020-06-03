import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface User {
  id: number;
  email: string;
  name?: string | null;
}

interface UserCreate {
  data: {
    email: string;
    name: string;
  };
}

const resolverMap: IResolvers = {
  Query: {
    helloWorld: (_: void, args: void): string => {
      return "Hello World Prisma and graphql";
    },
    findUsers: async (_: void, args: void): Promise<User[]> => {
      const findUser = prisma.user.findMany();
      return findUser;
    },
  },
  Mutation: {
    userCreate: async (_: void, args: UserCreate): Promise<User> => {
      const user = await prisma.user.create({
        data: {
          email: args.data.email,
          name: args.data.name,
        },
      });
      return user;
    },
  },
};
export default resolverMap;

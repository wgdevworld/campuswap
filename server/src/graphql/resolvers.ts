import User, { IUser } from "../models/User";
import Item, { IItem } from "../models/Item";

export const resolvers = {
  Query: {
    allUsers: async (): Promise<IUser[]> => {
      return User.find({});
    },
    userById: async (_: any, { id }: { id: string }): Promise<IUser | null> => {
      return User.findById(id);
    },
    allItems: async (): Promise<IItem[]> => {
      return Item.find({}).populate("owner");
    },
    itemById: async (_: any, { id }: { id: string }): Promise<IItem | null> => {
      return Item.findById(id).populate("owner");
    },
    // TODO: other queries
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        email,
        password,
        contactInfo,
      }: { email: string; password: string; contactInfo: string }
    ): Promise<IUser> => {
      const newUser = new User({ email, password, contactInfo });
      return newUser.save();
    },
    createItem: async (
      _: any,
      {
        name,
        description,
        boughtFor,
        usedFor,
        ownerId,
      }: {
        name: string;
        description?: string;
        boughtFor: number;
        usedFor: string;
        ownerId: string;
      }
    ): Promise<IItem> => {
      const newItem = new Item({
        name,
        description,
        boughtFor,
        usedFor,
        owner: ownerId,
      });
      return newItem.save();
    },
    // TODO: other mutations
  },
  // TODO: any other necessary resolvers for custom types
};

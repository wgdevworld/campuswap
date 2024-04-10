import { IResolvers } from "apollo-server-express";
import User from "../models/User";
import Item from "../models/Item";

export const resolvers: IResolvers = {
  Query: {
    allUsers: async () => await User.find({}),
    userById: async (_, { id }) => await User.findById(id),
    allItems: async () => await Item.find({}).populate("owner"),
    itemById: async (_, { id }) => await Item.findById(id).populate("owner"),
  },
  Mutation: {
    createUser: async (_, { email, password, contactInfo }) => {
      const newUser = new User({ email, password, contactInfo });
      return await newUser.save();
    },
    createItem: async (
      _,
      { name, description, boughtFor, usedFor, ownerId }
    ) => {
      const newItem = new Item({
        name,
        description,
        boughtFor,
        usedFor,
        owner: ownerId,
      });
      return await newItem.save();
    },
    // TODO: Other mutations implementations
  },
  User: {
    items: async (user) => await Item.find({ owner: user.id }),
  },
  Item: {
    owner: async (item) => await User.findById(item.owner),
  },
};

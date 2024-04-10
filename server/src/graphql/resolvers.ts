import User, { IUser } from "../models/User";
import Item, { IItem } from "../models/Item";
import Request, { IRequest } from "../models/Request";

export const resolvers = {
  Query: {
    //USER queries
    fetchAllUsers: async (): Promise<IUser[]> => {
      return User.find({});
    },
    fetchUserById: async (
      _: any,
      { id }: { id: string }
    ): Promise<IUser | null> => {
      return User.findById(id);
    },
    //ITEM queries
    fetchAllItems: async (): Promise<IItem[]> => {
      return Item.find({}).populate("owner");
    },
    fetchItemById: async (
      _: any,
      { id }: { id: string }
    ): Promise<IItem | null> => {
      return Item.findById(id).populate("owner");
    },
    //REQUEST queries
    fetchAllRequests: async (): Promise<IRequest[]> => {
      return Request.find({})
        .populate("fromUser")
        .populate("toUser")
        .populate({
          path: "items",
          populate: { path: "owner" },
        });
    },
    fetchRequestById: async (
      _: any,
      { id }: { id: string }
    ): Promise<IRequest | null> => {
      return Request.findById(id)
        .populate("fromUser")
        .populate("toUser")
        .populate({
          path: "items",
          populate: { path: "owner" },
        });
    },
  },
  Mutation: {
    //USER mutations
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
    deleteUser: async (
      _: any,
      { id }: { id: string }
    ): Promise<IUser | null> => {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return deletedUser;
    },
    //ITEM mutations
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
    deleteItem: async (
      _: any,
      { id }: { id: string }
    ): Promise<IItem | null> => {
      const deletedItem = await Item.findByIdAndDelete(id).populate("owner");
      if (!deletedItem) {
        throw new Error("Item not found");
      }
      return deletedItem;
    },
    // REQUEST mutations
    createRequest: async (
      _: any,
      {
        fromUserId,
        toUserId,
        message,
        itemIds,
      }: {
        fromUserId: string;
        toUserId: string;
        message?: string;
        itemIds: string[];
      }
    ): Promise<IRequest> => {
      const fromUser = await User.findById(fromUserId);
      const toUser = await User.findById(toUserId);
      if (!fromUser || !toUser) {
        throw new Error("User not found");
      }
      const items = await Item.find({
        _id: { $in: itemIds },
      });
      if (items.length !== itemIds.length) {
        throw new Error(
          "One or more items not found, or don't belong to the user"
        );
      }

      const newRequest = new Request({
        fromUser: fromUserId,
        toUser: toUserId,
        message: message,
        items: itemIds,
      });

      return newRequest.save();
    },
    deleteRequest: async (
      _: any,
      { id }: { id: string }
    ): Promise<IRequest | null> => {
      const deletedRequest = await Request.findByIdAndDelete(id);
      if (!deletedRequest) {
        throw new Error("Request not found");
      }
      return deletedRequest;
    },
  },
};

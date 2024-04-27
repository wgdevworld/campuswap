import User, { IUser } from "../models/User";
import Item, { IItem } from "../models/Item";
import Request, { IRequest } from "../models/Request";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
require("dotenv").config();

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
    fetchItemsByUserId: async (
      _: any,
      { userId }: { userId: string }
    ): Promise<IItem[]> => {
      const items = await Item.find({ owner: userId }).populate("owner");
      return items;
    },
    //REQUEST queries
    fetchAllRequests: async (): Promise<IRequest[]> => {
      return Request.find({})
        .populate("fromUser")
        .populate("toUser")
        .populate("wantItem")
        .populate("offeredItems");
    },
    fetchRequestById: async (
      _: any,
      { id }: { id: string }
    ): Promise<IRequest | null> => {
      return Request.findById(id)
        .populate("fromUser")
        .populate("toUser")
        .populate("wantItem")
        .populate("offeredItems");
    },
    fetchSentRequests: async (
      _: any,
      { userId }: { userId: string }
    ): Promise<IRequest[]> => {
      return Request.find({ fromUser: userId })
        .populate("fromUser")
        .populate("toUser")
        .populate("wantItem")
        .populate("offeredItems");
    },

    fetchReceivedRequests: async (
      _: any,
      { userId }: { userId: string }
    ): Promise<IRequest[]> => {
      return Request.find({ toUser: userId })
        .populate("fromUser")
        .populate("toUser")
        .populate("wantItem")
        .populate("offeredItems");
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
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password: hashedPassword,
        contactInfo,
        verified: false,
      });
      const savedUser = await newUser.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_MAIL,
          pass: process.env.GOOGLE_APP_KEY,
        },
      });

      const mailOptions = {
        from: process.env.GOOGLE_MAIL,
        to: email,
        subject: "CampuSwap: Verify Your Email",
        text: `Please verify your email by clicking on the following link: http://localhost:4000/verify?token=${savedUser._id}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Verification email sent:", info.response);
        }
      });

      return savedUser;
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
        imageUrl,
      }: {
        name: string;
        description?: string;
        boughtFor: number;
        usedFor: string;
        ownerId: string;
        imageUrl: string;
      }
    ): Promise<IItem | null> => {
      const newItem = new Item({
        name,
        description,
        boughtFor,
        usedFor,
        owner: ownerId,
        imageUrl: imageUrl,
      });
      await newItem.save();
      const populatedItem = await Item.findById(newItem._id).populate("owner");
      if (!populatedItem) {
        throw new Error("Item could not be found after saving.");
      }
      return populatedItem;
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
        wantItemId,
        offeredItemIds,
      }: {
        fromUserId: string;
        toUserId: string;
        message?: string;
        wantItemId: string;
        offeredItemIds: string[];
      }
    ): Promise<IRequest | null> => {
      const fromUser = await User.findById(fromUserId);
      const toUser = await User.findById(toUserId);
      if (!fromUser || !toUser) {
        throw new Error("User not found");
      }
      const wantItem = await Item.findById(wantItemId);
      if (!wantItem) {
        throw new Error("Requested item is unavailable!");
      }
      const offeredItems = await Item.find({
        _id: { $in: offeredItemIds },
        owner: fromUserId,
      });
      if (offeredItems.length !== offeredItemIds.length) {
        throw new Error(
          "One or more items not found, or don't belong to the user"
        );
      }
      const newRequest = new Request({
        fromUser: fromUserId,
        toUser: toUserId,
        message: message,
        wantItem: wantItemId,
        offeredItems: offeredItemIds,
      });

      await newRequest.save();
      const populatedRequest = await Request.findById(newRequest._id)
        .populate("wantItem")
        .populate("offeredItems")
        .populate("fromUser")
        .populate("toUser");
      return populatedRequest;
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
    acceptRequest: async (
      _: any,
      { requestId }: { requestId: string }
    ): Promise<IRequest | null> => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const acceptedRequest = await Request.findById(requestId).session(
          session
        );
        if (!acceptedRequest) {
          throw new Error("Request not found");
        }
        await Item.deleteMany({
          _id: { $in: acceptedRequest.offeredItems },
        }).session(session);

        // Delete items that match wantItem
        await Item.deleteMany({
          _id: acceptedRequest.wantItem,
        }).session(session);

        await Request.deleteMany({
          wantItem: { $in: acceptedRequest.offeredItems },
        }).session(session);
        await Request.deleteMany({
          wantItem: acceptedRequest.wantItem,
        }).session(session);
        await Request.deleteMany({
          offeredItems: { $in: acceptedRequest.offeredItems },
        }).session(session);
        await Request.deleteMany({
          offeredItems: acceptedRequest.wantItem,
        }).session(session);
        await Request.findByIdAndDelete(requestId).session(session);
        await session.commitTransaction();
        return acceptedRequest;
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    },
  },
};

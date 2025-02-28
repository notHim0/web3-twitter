import { defineField, defineType } from "sanity";

export const userSchema = defineType({
  name: "users",
  type: "document",
  title: "Users",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "walletAddress",
      type: "string",
      title: "Wallet Address",
    }),
    defineField({
      name: "profileImage",
      type: "string",
      title: "Profile Image",
    }),
    defineField({
      name: "isProfileImageNft",
      title: "Is Profile Image NFT",
      type: "boolean",
    }),
    defineField({
      name: "coverImage",
      type: "string",
      title: "Cover Image",
    }),
    defineField({
      name: "tweets",
      title: "Tweets",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tweets" }],
        },
      ],
    }),
  ],
});

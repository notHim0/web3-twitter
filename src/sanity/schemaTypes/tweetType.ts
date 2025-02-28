import { defineField, defineType } from "sanity";

export const tweetSchema = defineType({
  name: "tweets",
  type: "document",
  title: "Tweets",
  fields: [
    defineField({
      name: "tweet",
      type: "string",
      title: "Tweet",
    }),
    defineField({
      name: "timestamp",
      type: "datetime",
      title: "Timestamp",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "users" }],
    }),
  ],
});

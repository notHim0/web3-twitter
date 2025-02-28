import { type SchemaTypeDefinition } from "sanity";
import { tweetSchema } from "./tweetType";
import { userSchema } from "./userType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tweetSchema, userSchema],
};

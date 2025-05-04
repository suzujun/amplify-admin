import { defineFunction } from "@aws-amplify/backend";

export const invokeAdminAPI = defineFunction({
  runtime: 20,
  name: "expressApi",
  entry: "./handler.ts",
  timeoutSeconds: 300,
});

import { Client, Account,Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("66682801001aa93c9a72"); // Your project ID

const account = new Account(client);
export const databases = new Databases(client, "66682e8d0021614bfa8d");
export { client, account };

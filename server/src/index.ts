import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Post } from "./entity/Post"

const typeDefs = gql`
  type Query {
    hello: String
    getPosts: [Post]
    users: [User!]!
  }

  type Mutation {
    createPost(title: String!, content: String!, authorId: String!): Post
    createUser(username: String!, email: String!): User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Comment {
    id: ID!
    content: String!
    post: Post!
    authour: User
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    getPosts: () => {
      return [
        {
          id: "1",
          title: "First Post",
          content: "This is the content of the first post",
          author: { id: "1", username: "user1", email: "user1@example.com" },
        },
      ];
    },
    users: async () => {
      // Fetch all users from the database
      return await User.find();
    },
  },
  Mutation: {
    // Changed from 'Mutations' to 'Mutation'
    createPost: async(
      _: any,
      {
        title,
        content,
        authorId,
      }: { title: string; content: string; authorId: string }
    ) => {
      const numericAuthorId = parseInt(authorId, 10);

  // Check for a valid conversion
  if (isNaN(numericAuthorId)) {
    throw new Error("Invalid authorId");
  }
      const author = await User.findOneBy({ id: numericAuthorId });

  // Check if the user was found
  if (!author) {
    throw new Error("User not found");
  }
      const post = new Post();
      post.title = title;
      post.content = content;
      post.author = author
      await post.save();
      return post;
    },
    createUser: async (
      _: any,
      { username, email }: { username: string; email: string }
    ) => {
      // Create a new user instance and save it to the database
      const user = new User();
      user.username = username;
      user.email = email;
      await user.save();
      return user;
    },
  },
};

async function startApolloServer(typeDefs: any, resolvers: any) {
  try {
    // Establish a connection to the database
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    // Initialize Apollo Server with type definitions and resolvers
    const apolloServer = new ApolloServer({ typeDefs, resolvers });

    // Initialize Express
    const app = express();

    // Apply Apollo GraphQL middleware and specify the path
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app as any, path: "/graphql" });

    // Specify the port and start listening for requests
    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(
        `🚀 Server is running at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error while starting the server:", error);
  }
}

// Execute the function to start the server
startApolloServer(typeDefs, resolvers);

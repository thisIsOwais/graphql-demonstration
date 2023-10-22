const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const { USERS } = require("./user");
const { TODOS } = require("./todo");


const schema={
  typeDefs: `
      type User {
          id: ID!
          name: String!
          username: String!
          email: String!
          phone: String!
          website: String!
      }

      type Todo {
          id: ID!
          title: String!
          completed: Boolean
          user: User
      }

      type Query {
          getTodos: [Todo]
          getAllUsers: [User]
          getUser(id: ID!): User
      }

  `,
  // Define the resolvers for the schema how data will be fetched
  resolvers: {
    Todo: {
      // Define a resolver for the user field of the Todo type how todo will be fetched
      user: (todo) => USERS.find((e) => e.id === todo.id),
    },
    Query: {
        // Define resolvers for the getTodos, getAllUsers, and getUser queries
      getTodos: () => TODOS,
      getAllUsers: () => USERS,
      getUser: async (parent, { id }) => USERS.find((e) => e.id === id),
    },
  },
}

async function startServer() {
  const app = express();

 
  // Create an instance of the ApolloServer class, passing in the schema and resolvers
  const server = new ApolloServer(schema);


  // Add middleware to handle JSON requests and CORS
  app.use(bodyParser.json());
  app.use(cors());


// Start the Apollo Server and attach it to the Express app    
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("Serevr Started at PORT 8000"));
}

startServer();
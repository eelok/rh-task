const express = require("express");
const fs = require('fs');
const app = express();
const passport = require("passport");
const {ApolloServe, gql} = require('apollo-server-express');
const manufacturersRouter = require("./routes/manufacturer");
const phonesRouter = require("./routes/phone");
const userRouter = require("./routes/user");
const { graphqlHTTP } = require('express-graphql');
const { rootResolver } = require("./graphql/resolver");
const { schema } = require("./graphql/schema");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/manufacturer", manufacturersRouter);
app.use("/phone", phonesRouter);
app.use("/user", userRouter);

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers ={
    Query: {
        books: () => books
    }
}
const server = new ApolloServer({typeDefs, resolvers}); 
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: rootResolver,
//     graphiql: true
// }));


module.exports = app;
const express = require("express");
const fs = require('fs');
const app = express();
const passport = require("passport");
const { ApolloServer, gql } = require('apollo-server-express');
const manufacturersRouter = require("./routes/manufacturer");
const phonesRouter = require("./routes/phone");
const userRouter = require("./routes/user");
const {validateUser} = require("./passport/validate");
const resolvers = require("./graphql/resolvers");

// const { graphqlHTTP } = require('express-graphql');
// const { rootResolver } = require("./graphql/resolver");
// const { schema } = require("./graphql/schema");
const port = process.env.PORT || 5555;




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/manufacturer", manufacturersRouter);
app.use("/phone", phonesRouter);
app.use("/user", userRouter);

const typeDefs = gql(fs.readFileSync("./graphql/schema.graphql", { encoding: "utf8" }));
const server = new ApolloServer(
  { typeDefs,
    resolvers: resolvers, 
    context: validateUser
  });

server.start().then((res) => {
  server.applyMiddleware({ app });
});


app.listen(port, () =>
  console.info(`Server started on port ${port}` + server.graphqlPath)
);


// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: rootResolver,
//     graphiql: true
// }));


module.exports = app;

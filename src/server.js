const { app } = require("./app");
const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");
const { validateUser } = require("./passport/validate");
const { Query, Phone, Manufacturer } = require("./graphql/query");
const { Mutation } = require("./graphql/mutation");
const port = process.env.PORT || 5555;

const typeDefs = [
    gql(fs.readFileSync("./src/graphql/user/schema.graphql", { encoding: "utf8" })),
    gql(fs.readFileSync("./src/graphql/manufacturer/schema.graphql", { encoding: "utf8" })),
    gql(fs.readFileSync("./src/graphql/phone/schema.graphql", { encoding: "utf8" })),
    gql(fs.readFileSync("./src/graphql/schema.graphql", { encoding: "utf8" }))
];

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Phone,
        Manufacturer,
        Mutation,
    },
    context: validateUser,
});

server.start().then((res) => {
    server.applyMiddleware({ app });
});

app.listen(port, () =>
    console.info(`Server started on port ${port}` + server.graphqlPath)
);

const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Manufacturer {
        name: String,
        location: String
    }
    input UserInput {
        email: String,
        name: String,
        password: String
    }
    type User {
        email: String,
        name: String,
        password: String
    }
    type Mutation {
        createUser(user: UserInput): User
    }
    type Query {
        user(id: Int!): User,
        users: [User],
        manufacturer(id: Int!): Manufacturer,
        manufacturers: [Manufacturer]
    }
`);

module.exports = {
    schema: schema
};
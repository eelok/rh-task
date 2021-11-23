const { buildSchema } = require('graphql');

const schema = buildSchema(`
    input ManufacturerInput{
        name: String,
        location: String
    }
    type Manufacturer {
        name: String,
        location: String
    } 
    input PhoneInput {
        name: String,
        quantity: Int,
        releaseDate: String,
        manufacturerId: Int
    }
    type Phone {
        name: String,
        quantity: Int,
        releaseDate: String,
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
        createManufacturer(manufacturer: ManufacturerInput): Manufacturer
        deleteManufacturer(id: Int!): Boolean
        updateManufacturer(id: Int!, manufacturer: ManufacturerInput): Manufacturer
        createPhone(manufacturerId: Int!, phone: PhoneInput): Phone
        deletePhone(id: Int!): Boolean
        updatePhone(id: Int!, phone: PhoneInput): Phone
    }
    type Query {
        user(id: Int!): User,
        users: [User],
        manufacturer(id: Int!): Manufacturer,
        manufacturers: [Manufacturer],
        phone(id: Int!): Phone
    }
`);

module.exports = {
    schema: schema
};
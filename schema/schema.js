const graphql = require('graphql');
const {Manufacturer, Phone} = require('../models');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;

const ManufacturerType = new GraphQLObjectType({
    name: 'Manufacturer',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        phones: {
            type: new GraphQLList(PhoneType),
            resolve(parent, args) {
                return Phone.findAll({where: {manufacturerId: parent.id}})
            }
        }
    })
});

const PhoneType = new GraphQLObjectType({
    name: 'Phone',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        quantity: {type: GraphQLInt},
        releaseDate: {type: GraphQLString},
        manufacturer: {
            type: ManufacturerType,
            resolve(parent, args) {
                return Manufacturer.findByPk(parent.manufacturerId);
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        manufacturers: {
            type: new GraphQLList(ManufacturerType),
            resolve(parent, args) {
                return Manufacturer.findAll();
            }
        },
        manufacturer: {
            type: ManufacturerType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Manufacturer.findByPk(args.id);
            }
        },
        phones: {
            type: new GraphQLList(PhoneType),
            resolve(parent, args) {
                return Phone.findAll();
            }
        },
        phone: {
            type: PhoneType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Phone.findByPk(args.id);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addManufacturer: {
            type: ManufacturerType,
            args: {
                name: {type: GraphQLString},
                location: {type: GraphQLString}
            },
            resolve(parent, args) {
                let manufacturer = {
                    name: args.name,
                    location: args.location
                }
                return Manufacturer.create(manufacturer);
            }
        },
        addPhone: {
            type: PhoneType,
            args: {
                name: {type: GraphQLString},
                quantity: {type: GraphQLInt},
                releaseDate: {type: GraphQLString},
                manufacturerId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let phone = {
                    name: args.name,
                    quantity: args.quantity,
                    releaseDate: args.releaseDate,
                    manufacturerId: args.manufacturerId
                }
                return Phone.create(phone);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
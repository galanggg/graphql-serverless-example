const { gql } = require("apollo-server-lambda");

exports.typeDefs = gql`
  type Person {
    id: ID!
    name: String!
    married: Boolean!
  }
  type Query {
    hello: String!
    allPerson: [Person]!
    personById(id: ID!): Person
    personByName(name: String!): Person
  }
  type Mutation {
    createPerson(id: ID!, name: String!, married: Boolean!): Person
    deletePerson(id: ID!): Person
    updatePerson(id: ID!, name: String!, married: Boolean!): Person
  }
`
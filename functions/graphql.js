const {ApolloError, gql, ApolloServer} = require('apollo-server-lambda')

/**
 * Initial State
 */
 const persons  = [
   {id: "245", name: "Galang Kerta", married: false},
   {id: "233", name: "Galanggg", married: true},
   {id: "214", name: "Galang Kerta M", married: false}
 ]


const typeDefs = gql`
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

const resolvers = {
  Query: {
    hello: (obj, args, context) =>{ return 'Hello World'},
    allPerson: (obj, args, context) => {
      return persons
    },
    personById: (obj, args, context) => {
      return persons.find(person => person.id === args.id)
    },
    personByName: (obj, args, context) => {
      return persons.find(person => person.name === args.name)
    }
  },
  Mutation: {
    createPerson: (obj, args, context) => {
      const person = {
        id: args.id,
        name: args.name,
        married: args.married
      }
      persons.push(person)
      return person
    },
    deletePerson: (obj, args, context) => {
      const index = persons.findIndex((person) => person.id === args.id)
      const person = persons[index]
      persons.splice(index, 1)
      return person
    },
    updatePerson: (obj, args, context) => {
      const person = persons.find((person) => person.id === args.id)
      if(args.name) person.name = args.name
      if(args.married) person.married = args.married
      return person
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

exports.handler = server.createHandler()
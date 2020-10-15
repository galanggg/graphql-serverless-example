const {ApolloError, gql, ApolloServer} = require('apollo-server-lambda')
const {persons} = require('./db')
const {resolvers} = require('./resolvers')
const {typeDefs} = require('./schema')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: function() {
    return {db: persons}
  },
  playground: true,
  introspection: true
})

exports.handler = server.createHandler()
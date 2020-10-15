exports.resolvers = {
  Query: {
    hello: (obj, args, context) =>{ return 'Hello World'},
    allPerson: (obj, args, context) => {
      return context.db
    },
    personById: (obj, args, context) => {
      return context.db.find(person => person.id === args.id)
    },
    personByName: (obj, args, context) => {
      return context.db.find(person => person.name === args.name)
    }
  },
  Mutation: {
    createPerson: (obj, args, context) => {
      const person = {
        id: args.id,
        name: args.name,
        married: args.married
      }
      context.db.push(person)
      return person
    },
    deletePerson: (obj, args, context) => {
      const index = context.db.findIndex((person) => person.id === args.id)
      const person = context.db[index]
      context.db.splice(index, 1)
      return person
    },
    updatePerson: (obj, args, context) => {
      const person = context.db.find((person) => person.id === args.id)
      if(args.name) person.name = args.name
      if(args.married) person.married = args.married
      return person
    }
  }
}
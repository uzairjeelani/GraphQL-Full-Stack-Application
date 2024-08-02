import { ApolloServer, gql } from 'apollo-server';

// Type definitions
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

// Sample data
const books = [
  { title: 'The Awakening', author: 'Kate Chopin' },
  { title: 'City of Glass', author: 'Paul Auster' },
];

// Resolvers
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (_: any, { title, author }: { title: string, author: string }) => {
      const newBook = { title, author };
      books.push(newBook);
      return newBook;
    },
  },
};

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


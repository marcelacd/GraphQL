import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql

  type Book {
    title: String
    author: String
    lanzamiento: String!
    autorTitle: String
  }

  type Books {
    books: [Book]
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        lanzamiento: String!
    ): Book

    editBook(
        title: String!
        newTitle: String!
    ): Book

    deleteBook(
        title: String!
    ): Books
  }
`;

let books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
      lanzamiento: '20 de julio'
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
      lanzamiento: '20 de julio'
    },
  ];

  // Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
    },
    Mutation: {
        addBook: (root, args) => {
            books.push({...args})
            return {...args}
        },
        editBook: (root, args) => {
            let bookUpdate = null
            books.map((book) => {
                if (book.title === args.title){
                    book.title = args.newTitle
                    bookUpdate = book
                } 
            })
            return bookUpdate
        },
        deleteBook: (root, args) => {
            books = books.filter(book => book.title !== args.title)
            console.log(books)
            return {books: books}
        }
    },
    Book: {
        autorTitle: (book) => `${book.title} ${book.author}`
    }
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
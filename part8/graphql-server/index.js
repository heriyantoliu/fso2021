const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

require('dotenv-flow').config();

console.log('connecting to', process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String]
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return await Book.find({});
      // let returnedBooks = books;
      // if (args.name) {
      //   returnedBooks = returnedBooks.filter(
      //     (book) => book.author === args.name
      //   );
      // }
      // if (args.genre) {
      //   returnedBooks = returnedBooks.filter((book) =>
      //     book.genres.includes(args.genre)
      //   );
      // }

      // return returnedBooks;
    },
    allAuthors: async () => {
      return await Author.find({});
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.find({ author: root.id }).countDocuments();
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({
            name: args.author,
          });
          author = await newAuthor.save();
        }

        const book = new Book({ ...args, author: author.id });
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidsArgs: args,
        });
      }

      return book;
    },
    editAuthor: async (root, args) => {
      try {
        const updatedAuthor = await Author.findOne({ name: args.name });
        if (!updatedAuthor) {
          return null;
        }
        updatedAuthor.born = args.setBornTo;
        await updatedAuthor.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidsArgs: args,
        });
      }

      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

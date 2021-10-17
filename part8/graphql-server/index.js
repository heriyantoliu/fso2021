const { ApolloServer, gql, UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const book = require('./models/book');

require('dotenv-flow').config();

const pubsub = new PubSub();

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
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!
    genres: [String]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return await Book.find({
          genres: { $elemMatch: { $eq: args.genre } },
        }).populate('author');
      }
      return await Book.find({}).populate('author');
    },
    allAuthors: async () => {
      return await Author.find({});
    },
    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      let book = null;

      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({
            name: args.author,
            bookCount: 1,
          });
          author = await newAuthor.save();
        } else {
          author.bookCount = author.bookCount + 1;
          await Author.findByIdAndUpdate(author._id, author);
        }

        book = new Book({ ...args, author: author.id });
        await book.save();
        await book.populate('author');
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidsArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      let updatedAuthor = null;

      try {
        updatedAuthor = await Author.findOne({ name: args.name });
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

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidsArgs: args,
        });
      }

      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wront credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscription ready at ${subscriptionsUrl}`);
});

import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

/**
 * @param { string } username
 * @param { string } email
 *
 */
const createToken = (username, email) =>
  sign({ username, email }, process.env.SECRET, { expiresIn: '1hr' });

export const resolvers = {
  Query: {
    getPosts: async (_, args, { Post }) =>
      await Post.find({}).sort({ createdDate: 'desc' }).populate({
        path: 'createdBy',
        model: 'User',
      }),
  },

  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) =>
      await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId,
      }).save(),

    signinUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');

      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) throw new Error('Invalid password');

      return { token: createToken(username, user.email) };
    },

    signupUser: async (_, { username, email, password }, { User }) => {
      if (await User.findOne({ username })) {
        throw new Error('User already exists');
      }

      await new User({ username, email, password }).save();
      return { token: createToken(username, email) };
    },
  },
};

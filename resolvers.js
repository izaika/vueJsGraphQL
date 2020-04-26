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

    signupUser: async (_, { username, email, password }, { User }) => {
      if (await User.findOne({ username })) {
        throw new Error('User already exists');
      }

      return await new User({ username, email, password }).save();
    },
  },
};

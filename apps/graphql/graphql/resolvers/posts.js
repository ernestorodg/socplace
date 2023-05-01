const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');



module.exports = {
  Query: {
    // async getPosts() {
    //   try {
    //     const posts = await Post.find().sort({ createdAt: -1 });
    //     return posts;
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
    async getProducts(_, args, { dataSources }) {
      try {
        return dataSources.productsAPI.getProducts();
      } catch (err) {
        throw new Error(err);
      }
    },
    async filterProduct(_, args, context) {
      try {
        product = await context.dataSources.productsAPI.filterProduct(args)
        // product = await context.dataSources.productsAPI.lookForProductByTitle(args)
        return product
      } catch (err) {
        throw new Error(err);
      }
    },
    async lookForProductByTitle(_, args, context) {
      try {
        product = await context.dataSources.productsAPI.filterProduct(args)
        return product
      } catch (err) {
        throw new Error(err);
      }
    },
    // async getPost(_, { postId }) {
    //   try {
    //     const post = await Post.findById(postId);
    //     if (post) {
    //       return post;
    //     } else {
    //       throw new Error('Post not found');
    //     }
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // }
    async getProduct(_, { productId }, { dataSources }) {
      try {
        const product = await dataSources.productsAPI.getProduct(productId);
        if (product) {
          return product;
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    // async createPost(_, { body }, context) {
    //   const user = checkAuth(context);

    //   if (body.trim() === '') {
    //     throw new Error('Post body must not be empty');
    //   }

    //   const newPost = new Post({
    //     body,
    //     user: user.id,
    //     username: user.username,
    //     createdAt: new Date().toISOString()
    //   });

    //   const post = await newPost.save();

    //   context.pubsub.publish('NEW_POST', {
    //     newPost: post
    //   });

    //   return post;
    // },
    async createProduct(_, args, context) {
      // const product = await context.dataSources.productsAPI.createProduct(body);
      const user = checkAuth(context);
      console.log(user)

      for (let key in args) {
        // if (args.key.trim() === '')
        //   throw new Error(`Product's ${key} must not be empty`)
          console.log(typeof(args[key]))
      }

      try {
        const price = parseFloat(args.price)
        console.log(price)
        const product = await context.dataSources.productsAPI.createProduct(user, args, price);
        console.log("Post created")
        context.pubsub.publish('NEW_PRODUCT', {
          newProduct: product
        });
        if (product) {
          return product;
        } else {
          throw new Error('Invalid post request');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteProduct(_, { productId }, context) {
      const user = checkAuth(context);
      try {
        product = await context.dataSources.productsAPI.getProduct(productId)
        if (user.username === product.seller) {
          await context.dataSources.productsAPI.deleteProduct(productId);
          return 'Product deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // async likePost(_, { postId }, context) {
    //   const { username } = checkAuth(context);

    //   const post = await Post.findById(postId);
    //   if (post) {
    //     if (post.likes.find((like) => like.username === username)) {
    //       // Post already likes, unlike it
    //       post.likes = post.likes.filter((like) => like.username !== username);
    //     } else {
    //       // Not liked, like post
    //       post.likes.push({
    //         username,
    //         createdAt: new Date().toISOString()
    //       });
    //     }

    //     await post.save();
    //     return post;
    //   } else throw new UserInputError('Post not found');
    // }
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
};

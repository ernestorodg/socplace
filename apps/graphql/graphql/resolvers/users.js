const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const checkAuth = require('../../util/check-auth');

const {
  validateRegisterInput,
  validateLoginInput
} = require('../../util/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      latitude: user.latitude,
      longitude: user.longitude,
      image: user.image,
      savedProducts: user.savedProducts
    },
    SECRET_KEY
    // { expiresIn: '1h' }
  );
}

module.exports = {
  Query: {
    async getUserData(_, { username }) {
      console.log('User: ', username)
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      return {
        id: user._id,
        username: user.username,
        latitude: user.latitude,
        longitude: user.longitude,
        image: user.image
      };
    },
    async getUsers() {
      try {
        const users = await User.find().sort({ createdAt: -1 });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong crendetials';
        throw new UserInputError('Wrong crendetials', { errors });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword,
          latitude, longitude, image }
      }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // TODO: Make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);
      const savedProducts = []

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
        latitude, 
        longitude, 
        image,
        savedProducts
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
    async saveProduct(_, { productId }, context) {
      console.log('saving product')
      const { username } = checkAuth(context);
      const user = await User.findOne({ username });
      const post = await context.dataSources.productsAPI.getProduct(productId);
      if (post) {
        console.log(user.savedProducts)
        if (user.savedProducts.find((savedProduct) => savedProduct.id === productId)) {
          // Product already saved, delete it
          user.savedProducts = user.savedProducts.filter(
            (savedProduct) => savedProduct.id !== productId
          );
        } else {
          // Not saved, save product
          user.savedProducts.push({
            id: productId,
            createdAt: new Date().toISOString()
          });
        }

        await user.save();
        console.log(user)
        return user.savedProducts;
      } else throw new UserInputError('Product not found');
    },
    async getUserSavedProducts(_, args, context) {
      const { username } = checkAuth(context);
      const user = await User.findOne({ username });
      console.log('retornando user: ', user)
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      return user.savedProducts;
    }
  }
};

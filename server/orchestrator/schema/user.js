const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const { forgotPassword } = require('../../services/user/controllers/UserController');
const redis = new Redis();
const url = 'http://localhost:4001/v1';

module.exports = {
  typeDefs: gql`
    type User {
      full_name: String
      email: String
      token: String
      password: String
      message: String
      isVerified: Boolean
    }

    type UserResult {
      user: User
      error: String
    }

    input RegisterInput {
      full_name: String
      email: String
      password: String
    }

    input LoginInput {
      email: String
      password: String
    }

    extend type Query {
      verifyEmail(token: String): User
      getUsers: [User]
    }
    
    extend type Mutation {
      register(user: RegisterInput): User
      forgotPassword(email: String): User
      updatePassword(user: LoginInput): User
      login(user: LoginInput): User
    }
  `,
  resolvers: {
    Query: {
      async verifyEmail(_, args) {
        try {
          const { data } = await axios.get(`${url}/activate/${args.token}`);
          return data;
        } catch(err) {
          return err;
        }
      },
      async getUsers(_, args) {
        try {
          const { data } = await axios.get(`${url}/users`);
          return data;
        } catch(err) {
          return err;
        }
      }
    },
    Mutation: {
      async login(_, args) {
        try {
          const { data } = await axios.post(`${url}/login`, args.user);
          return data;
        } catch(err) {
          return err;
        }
      },
      async register(parent, args, context, info) {
        try {
          const { data } = await axios.post(`${url}/register`, args.user)
          return data;
        } catch(err) {
          return err;
        }
      },
      async forgotPassword(_, args) {
        try {          
          const { data } = await axios.post(`${url}/forgot-password`, { email: args.email });
          return data;
        } catch(err) {
          return err;
        }
      },
      async updatePassword(_, args) {
        try {
          const { data } = await axios.post(`${url}/reset-password`, args.user);
          return data;
        } catch(err) {
          return err;
        }
      }
    }
  }
}
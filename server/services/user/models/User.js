const { getDatabase } = require('../config/mongodb');
const { hashPassword } = require('../helpers/bcrypt');
const ObjectID = require('mongodb').ObjectID;

class User {
  static register(user) {
    user.password = hashPassword(user.password);
    return getDatabase().collection('users').insertOne(user);
  }

  static findingOne(email) {
    return getDatabase().collection('users').findOne({ email });
  }

  static updateByEmail(email) {
    return getDatabase().collection('users').updateOne({
      email
    }, { 
      $set: {
        isVerified: true
      }
    })
  }

  static getAll() {
    return getDatabase().collection('users').find().toArray();
  }

  static updatePasswordByEmail(email, password) {
    password = hashPassword(password);
    return getDatabase().collection('users').updateOne({
      email
    }, {
      $set: {
        password
      }
    })
  }
}

module.exports = User;
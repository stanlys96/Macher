const User = require('../models/User');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken, verifyToken } = require('../helpers/jwt');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'stanly.example@gmail.com', 
    pass: 'hahaha123!', 
  },
  tls: {
    rejectUnauthorized: false
  }
});

class UserController {
  static async register(req, res) {
    try {
      const { full_name, email, password } = req.body;
      const validateUser = await User.findingOne(email);
      if (validateUser) {
        res.json({ message: 'Email address is already registered!' });
      } else {
        const user = await User.register({
          full_name,
          email,
          password,
          isVerified: false
        });
      
        const token = generateToken({
          full_name: user.ops[0].full_name,
          email: user.ops[0].email
        })
  
        let info = await transporter.sendMail({
          from: '"Stanly Foo 👻" <stanly.example@gmail.com>', 
          to: req.body.email, 
          subject: "Verify Email", 
          text: "Hello world", 
          html: `<b>Click here to verify your email:</b><p>http://localhost:3000/active/${token}</p>`, 
        });
  
        res.json({
          full_name: user.ops[0].full_name,
          email: user.ops[0].email,
          token
        });
      }
    } catch(err) {
      return err;
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findingOne(email);
      if (user) {
        if (!user.isVerified) {
          return res.json({ message: 'Please verify your email!' })
        }
        const comparedPassword = comparePassword(password, user.password);
        if (comparedPassword) {
          const token = generateToken({
            full_name: user.full_name,
            email: user.email
          })
          res.json({
            full_name: user.full_name,
            email: user.email,
            token
          })
        } else {
          res.json({ message: 'Email or password is incorrect!' });
        }
      } else {
        res.json({ message: 'Email or password is incorrect!' });
      }
    } catch(err) {
      console.log(err);
    }
  }

  static async verifyEmail(req, res) {
    try {
      const token = req.params.token;
      const { full_name, email } = verifyToken(token);
      const user = await User.updateByEmail(email);
      res.json({
        email
      });
    } catch(err) {
      console.log(err);
    }
  }

  static async getAll(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch(err) {
      console.log(err);
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findingOne(email);
      console.log(req.body);
      if (!user) {
        return res.json({ message: "Email address is not registered!" })
      }
      const token = generateToken({ email })
      let info = await transporter.sendMail({
        from: '"Stanly Foo 👻" <stanly.example@gmail.com>', 
        to: req.body.email, 
        subject: "Reset Password", 
        text: "Hello world", 
        html: `<b>Click here to reset your password:</b><p>http://localhost:3000/reset-password</p>`, 
      });
      return res.json({
        email
      })
    } catch(err) {
      console.log(err);
    }
  }

  static async updatePassword(req, res) {
    try {
      const { email, password } = req.body;
      const user = User.updatePasswordByEmail(email, password);
      return res.json({ email });
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = UserController;
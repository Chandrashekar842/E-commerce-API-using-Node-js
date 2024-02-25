import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "ecommerce", { expiresIn: "1h" });
};

export const postSignUp = async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists!" });
    }
  } catch (err) {
    console.log(err);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newuser = User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin
  })
    .then(() => {
      return res.status(200).json({ message: "New User added" });
    })
    .catch((err) => {
      return res.status(404).json({error: err})
    });
};

export const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "User doesn't exist in database" });
  }
  bcrypt
    .compare(password, user.password)
    .then((doMatch) => {
      if (doMatch) {
        const token = generateToken(user.id);
        req.user = user;
        return res.status(200).json({ login: 'Success', jwt: token });
      }
      return res.status(401).json({ error: "Invalid Credentials" });
    })
    .catch((err) => {
        return res.status(400).json({error: err})
    });
};

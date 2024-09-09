import bcrypt from "bcrypt";
import { User } from "../models/users.mjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const LoginController = async (req, res) => {
  const result = validationResult(req);
  console.log(result, "result");

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }
  let { username, password } = req.body;
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      throw new Error("User not found");
    }
    const comparePassword = bcrypt.compareSync(password, findUser.password);

    if (!comparePassword) {
      return res.status(400).send({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: findUser._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.send({ token, username: username, password: password });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const SignUpController = async (req, res) => {
  const result = validationResult(req);
  console.log(result, "result");
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  let { username, password } = req.body;

  try {
    const findUser = await User.findOne({ username });
    console.log(findUser, "findUser");

    if (findUser) {
      return res.status(400).send({ msg: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });
    const saveUser = await newUser.save();
    return res.status(201).send(saveUser);
  } catch (error) {
    console.error(error.message, "errr");
    res.status(500).send("Server Error");
  }
};

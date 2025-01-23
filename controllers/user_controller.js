import UserModel from "../models/user_model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export async function getUsers(req, res) {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function postUser(req, res) {
  try {
    let user = req.body;
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await UserModel.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators:true
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function login(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = generateToken({ userId: user._id, role: "user" });
      return res.status(200).json({ message: "connected!", token });
    }
    res.status(400).json("email or password incorrect!");
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}
